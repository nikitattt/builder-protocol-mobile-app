import WidgetKit
import SwiftUI

struct Provider: IntentTimelineProvider {
  let dataLoader = WidgetDataLoader()
  
  private let placeholder = SimpleEntry(
    date: Date(),
    daoName: "The Perfect Dao",
    governance: [
      ProposalData(
        id: "0x1",
        number: 1,
        title: "Great Proposal for the DAO",
        state: "ACTIVE",
        endTime: 1683789333,
        quorum: 18,
        votes: ProposalVotes(yes: 20, no: 0, abstain: 0)
      ),
      ProposalData(
        id: "0x2",
        number: 2,
        title: "Amazing Proposal No42",
        state: "ACTIVE",
        endTime: 1683789333,
        quorum: 18,
        votes: ProposalVotes(yes: 12, no: 6, abstain: 6)
      ),
    ],
    state: .success
  )
  
  func placeholder(in context: Context) -> SimpleEntry {
    return placeholder
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    completion(placeholder)
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    let address = configuration.dao?.identifier
    let daoName = configuration.dao?.displayString
    let chain = ChainID(rawValue: configuration.dao?.chainId?.intValue ?? 1)
    
    guard let address = address, let daoName = daoName, let chain = chain else {
      let entry = SimpleEntry(date: Date(), daoName: daoName, governance: nil, state: .noDaoSelected)
      let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
      let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
      completion(timeline)
      return
    }
    
    dataLoader.fetchGovernanceData(daoAddress: address, chain: chain) { data in
      if let governance = data?.governance {
        let entry = SimpleEntry(
          date: Date(),
          daoName: daoName,
          governance: governance,
          state: .success
        )
        
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      } else {
        let entry = SimpleEntry(date: Date(), daoName: daoName, governance: nil, state: .error)
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      }
    }
  }
}

enum WidgetState {
  case success, error, noDaoSelected
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let daoName: String?
  let governance: [ProposalData]?
  let state: WidgetState
}

struct GovernanceEntryView : View {
  var entry: Provider.Entry
  
  @Environment(\.widgetFamily) var widgetFamily
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      let deviderColor = colorScheme == .light
      ? Color(red: 0.8, green: 0.8, blue: 0.8)
      : Color(red: 0.079, green: 0.079, blue: 0.079)
      
      VStack(alignment: .leading, spacing: 4) {
        HStack(alignment: .center, spacing: 0) {
          Text(entry.daoName!)
            .font(.system(size: 12, weight: .bold))
          
          Spacer()
          
          HStack(alignment: .center, spacing: 2) {
            let activeProps = entry.governance!.filter { $0.state == "ACTIVE" }.count
            let pendingProps = entry.governance!.filter { $0.state == "PENDING" }.count
            
            if activeProps > 0 {
              Text("Active")
                .font(.system(size: 12))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
              Text(String(activeProps))
                .font(.system(size: 12))
            }
            if pendingProps > 0 {
              Text("Pending")
                .font(.system(size: 12))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
                .padding(.leading, 2)
              Text(String(pendingProps))
                .font(.system(size: 12))
            }
          }
        }
        
        VStack {
          Divider().background(deviderColor)
        }
        
        VStack(alignment: .leading, spacing: 4) {
          if (entry.governance!.isEmpty) {
            Text("All done. No Active or Pending props ⌐◨-◨")
              .font(.system(size: 12))
          } else {
            let maxShow = widgetFamily == .systemMedium ? 3 : 9
            let displayProposals = entry.governance!.prefix(maxShow)
            
            ForEach(displayProposals, id: \.id) { proposal in
              ProposalView(
                proposal: proposal,
                displayType: .full,
                lightTheme: colorScheme == .light
              )
            }
          }
          
          Spacer(minLength: 0)
        }
      }
      .paddingForOlderVersions()
      .widgetBackground(backgroundView: colorScheme == .light ? Color.white : Color.black)
    case .error:
      VStack(alignment: .center) {
        Image(systemName: "xmark.octagon")
          .padding(.bottom, 2)
        Text("Error happened")
          .font(.system(size: 12, weight: .bold))
          .multilineTextAlignment(.center)
      }
      .widgetBackground(backgroundView: colorScheme == .light ? Color.white : Color.black)
    case .noDaoSelected:
      VStack(alignment: .center) {
        Image(systemName: "hand.tap.fill")
          .padding(.bottom, 2)
        Text("Tap and hold to set up widget")
          .font(.system(size: 12, weight: .bold))
          .multilineTextAlignment(.center)
          
      }
      .widgetBackground(backgroundView: colorScheme == .light ? Color.white : Color.black)
    }
  }
}

@main
struct Governance: Widget {
  let kind: String = "Governance"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: Provider()) { entry in
      GovernanceEntryView(entry: entry)
    }
    .supportedFamilies([.systemMedium, .systemLarge])
    .configurationDisplayName("Governace")
    .description("Active and pending proposals.")
  }
}
