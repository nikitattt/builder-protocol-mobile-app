import WidgetKit
import SwiftUI

struct ArtProvider: IntentTimelineProvider {
  typealias Entry = ArtEntry
  
  let dataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> ArtEntry {
    ArtEntry(date: Date(), image: UIImage(named: "Placeholder")!.pngData()!, state: .success)
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (ArtEntry) -> Void) {
    let entry = ArtEntry(
      date: Date(),
      image: UIImage(named: "Placeholder")!.pngData()!,
      state: .success
    )
    completion(entry)
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
    let address = configuration.dao?.identifier
    let chain = ChainID(rawValue: configuration.dao?.chainId?.intValue ?? 1)
    
    guard let address = address, let chain = chain else {
      let entry = ArtEntry(date: Date(), image: nil, state: .noDaoSelected)
      let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
      let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
      completion(timeline)
      return
    }
    
    dataLoader.fetchImageData(daoAddress: address, chain: chain) { imageData in
      if let image = imageData {
        let entry = ArtEntry(date: Date(), image: image, state: .success)
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
      } else {
        let entry = ArtEntry(date: Date(), image: nil, state: .error)
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

struct ArtEntry: TimelineEntry {
  let date: Date
  let image: Data?
  let state: WidgetState
}

struct ArtEntryView: View {
  var entry: ArtProvider.Entry
  
  @Environment(\.widgetFamily) var widgetFamily
  @Environment(\.colorScheme) var colorScheme
  
  var body: some View {
    switch entry.state {
    case .success:
      Image(uiImage: UIImage(data: entry.image!)!)
        .resizable()
        .aspectRatio(contentMode: .fit)
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
struct ArtWidget: Widget {
  let kind: String = "Art"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: ArtProvider()) { entry in
      ArtEntryView(entry: entry)
    }
    .supportedFamilies([.systemSmall])
    .configurationDisplayName("Art")
    .description("Current auctioned artwork.")
    .contentMarginsDisabledIfAvailable()
  }
}
