import WidgetKit
import SwiftUI

struct ArtProvider: IntentTimelineProvider {
  typealias Entry = ArtEntry
  
  let widgetDataLoader = WidgetDataLoader()
  
  func placeholder(in context: Context) -> ArtEntry {
    ArtEntry(date: Date(), image: UIImage(named: "Placeholder")!.pngData()!, state: .success)
  }
  
  func getSnapshot(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (ArtEntry) -> Void) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      widgetDataLoader.fetchImageData(daoAddress: address) { imageData in
        if let imageData = imageData, let image = UIImage(data: imageData) {
          let entry = ArtEntry(date: Date(), image: image.pngData()!, state: .success)
          completion(entry)
        } else {
          let entry = ArtEntry(date: Date(), image: nil, state: .error)
          completion(entry)
        }
      }
    } else {
      let entry = ArtEntry(date: Date(), image: nil, state: .noDao)
      completion(entry)
    }
  }
  
  func getTimeline(for configuration: SelectDAOIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> Void) {
    let address = configuration.dao?.identifier
    
    if let address = address {
      widgetDataLoader.fetchImageData(daoAddress: address) { imageData in
        if let imageData = imageData, let image = UIImage(data: imageData) {
          let entry = ArtEntry(date: Date(), image: image.pngData()!, state: .success)
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
        } else {
          let entry = ArtEntry(date: Date(), image: nil, state: .error)
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
        }
      }
    } else {
      let entry = ArtEntry(date: Date(), image: nil, state: .noDao)
      let timeline = Timeline(entries: [entry], policy: .atEnd)
      completion(timeline)
    }
  }
}

enum WidgetState {
  case success, error, noDao
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
      VStack {
        Image(systemName: "xmark.octagon").padding(.bottom, 1)
        Text("Error happened")
      }
      .foregroundColor(colorScheme == .light ? .black : .white)
    case .noDao:
      VStack {
        Image(systemName: "exclamationmark.triangle").padding(.bottom, 1)
        Text("Select DAO")
      }
      .foregroundColor(colorScheme == .light ? .black : .white)
    }
  }
}

@main
struct ArtWidget: Widget {
  let kind: String = "Art"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: SelectDAOIntent.self, provider: ArtProvider()) { entry in
      ArtEntryView(entry: entry)
    }.supportedFamilies([
      .systemSmall, .systemLarge])
    .configurationDisplayName("Art")
    .description("This widget displays the current auctioned NFT image of your selected DAO.")
  }
}

struct ArtWidget_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ArtEntryView(entry: ArtEntry(date: Date(), image: UIImage(named: "Placeholder")!.pngData()!, state: .success))
                .previewContext(WidgetPreviewContext(family: .systemSmall))
                .environment(\.colorScheme, .light)
            
            ArtEntryView(entry: ArtEntry(date: Date(), image: nil, state: .error))
                .previewContext(WidgetPreviewContext(family: .systemSmall))
                .environment(\.colorScheme, .dark)
            
            ArtEntryView(entry: ArtEntry(date: Date(), image: nil, state: .noDao))
                .previewContext(WidgetPreviewContext(family: .systemSmall))
                .environment(\.colorScheme, .light)
        }
    }
}
