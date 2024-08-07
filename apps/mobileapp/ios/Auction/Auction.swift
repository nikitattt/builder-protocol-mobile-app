import WidgetKit
import SwiftUI
import Intents

struct Provider: IntentTimelineProvider {
  let dataLoader = WidgetDataLoader()
  
  private let placeholder = SimpleEntry(
    date: Date(),
    auction: AuctionData(
      id: 136,
      currentBid: 0.1234,
      bidder: "-",
      endTime: 0,
      image: UIImage(named: "ImagePlaceholder")!.pngData()!,
      duration: 86400
    ),
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
    let chain = ChainID(rawValue: configuration.dao?.chainId?.intValue ?? 1)
    
    guard let address = address, let chain = chain else {
      let entry = SimpleEntry(date: Date(), auction: nil, state: .noDaoSelected)
      let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
      let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
      completion(timeline)
      return
    }
    
    dataLoader.fetchAuctionData(daoAddress: address, chain: chain) { auction in
      if let auction = auction {
        let entry = SimpleEntry(date: Date(), auction: auction, state: .success)
        
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      } else {
        let entry = SimpleEntry(date: Date(), auction: nil, state: .error)
        
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
  let auction: AuctionData?
  let state: WidgetState
}

struct AuctionEntryView : View {
  var entry: Provider.Entry
  
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      let timeToGo = max(0, Double(entry.auction!.endTime) - Date().timeIntervalSince1970)
      
      VStack(alignment: .leading, spacing: 8) {
        HStack(alignment: .top, spacing: 8) {
          VStack(alignment: .center, spacing: 1) {
            Image(uiImage: UIImage(data: entry.auction!.image)!)
              .resizable()
              .frame(width: 52, height: 52)
              .cornerRadius(8)
            Text(String(entry.auction!.id))
              .font(.system(size: 12, weight: .bold))
          }
          
          let bid = entry.auction!.currentBid.toThreeDecimalPlaces()
          
          VStack(alignment: .leading, spacing: 0) {
            Text(timeToGo == 0 ? "Winning bid" : "Current bid")
              .font(.system(size: 12))
            Text("\(String(bid)) Ξ")
              .font(.system(size: 18, weight: .black))
              .minimumScaleFactor(0.5)
              .lineLimit(1)
            HStack(alignment: .center, spacing: 2) {
              //              Image("ArrowCirclePath")
              //                .resizable()
              //                .frame(width: 10, height: 10)
              Text("As of")
                .font(.system(size: 10))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
              Text(entry.date, style: .time)
                .font(.system(size: 10))
                .foregroundColor(Color(red: 0.55, green: 0.55, blue: 0.55))
            }
          }
          .padding(.top, 2)
        }
        
        VStack(alignment: .leading, spacing: 2) {
          Text("Auction ends in")
            .font(.system(size: 12))
          Text(timeToGo == 0 ? "Ended" : timeToGo.secondsToDhms())
            .font(.system(size: 18, weight: .black))
          ProgressBar(value: timeToGo, maxValue: Double(entry.auction!.duration))
            .frame(height: 8)
            .padding(.top, 2)
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

struct ProgressBar: View {
  var value: Double
  var maxValue: Double
  
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    let foregroundColor: Color = colorScheme == .light ? .black : .white
    let backgroundColor: Color = colorScheme == .light
    ? Color(red: 0.92, green: 0.92, blue: 0.92)
    : Color(red: 0.16, green: 0.16, blue: 0.16)
    
    GeometryReader { geometry in
      ZStack(alignment: .leading) {
        RoundedRectangle(cornerRadius: 69)
          .fill(backgroundColor)
        
        RoundedRectangle(cornerRadius: 69)
          .fill(foregroundColor)
          .frame(width: CGFloat(value / maxValue) * geometry.size.width)
      }
    }
  }
}

struct Auction: Widget {
  let kind: String = "Auction"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: Provider()) { entry in
      AuctionEntryView(entry: entry)
    }
    .supportedFamilies([
      .systemSmall])
    .configurationDisplayName("Auction")
    .description("Auction state in compact form.")
  }
}
