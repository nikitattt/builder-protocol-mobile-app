import SwiftUI

struct ProposalsView: View {
  let proposals: [ProposalData]
  
  @Environment(\.widgetFamily) var widgetFamily
  
  var body: some View {
    VStack(alignment: .leading, spacing: 2) {
      if (proposals.isEmpty) {
        Text("All done. No Active or Pending props ⌐◨-◨")
          .font(.system(size: 12))
          .padding(.top, 2)
      } else {
        let maxShow = widgetFamily == .systemMedium ? 3 : 8
        let displayProposals = proposals.prefix(maxShow)
        
        ForEach(displayProposals, id: \.id) { proposal in
          ProposalView(
            proposal: proposal,
            displayType: widgetFamily == .systemMedium ? .compact : .full
          )
        }
      }
      
      Spacer(minLength: 0)
    }
  }
}

enum ProposalDisplayType {
  case compact, full
}

struct ProposalView: View {
  let proposal: ProposalData
  let displayType: ProposalDisplayType
  
  let timeLeft: Double
  let endsIn: String
  
  let isActive: Bool
  
  let timePrefix: String
  let timeColor: Color
  let timeBorderColor: Color
  
  let state: String
  let stateColor: Color
  let stateBorderColor: Color
  
  @Environment(\.colorScheme) var colorScheme
  
  init(proposal: ProposalData, displayType: ProposalDisplayType) {
    self.proposal = proposal
    self.displayType = displayType
    
    timeLeft = max(0, Double(proposal.endTime) - Date().timeIntervalSince1970)
    
    let formatter = RelativeDateTimeFormatter()
    formatter.unitsStyle = .short
    formatter.dateTimeStyle = .numeric
    formatter.locale = Locale(identifier: "en-US")
    
    endsIn = formatter.localizedString(
      for: Date(timeIntervalSince1970: proposal.endTime),
      relativeTo: Date.now
    )
    
    if (timeLeft <= 43200) {
      timeColor = Color(red: 0.941, green: 0.196, blue: 0.196)
      timeBorderColor = timeColor.opacity(0.3)
    } else {
      timeColor = Color(red: 0.55, green: 0.55, blue: 0.55)
      timeBorderColor = Color(red: 0.80, green: 0.80, blue: 0.80)
    }
    
    if (proposal.state == "ACTIVE") {
      isActive = true
      
      timePrefix = "Ends"
      state = "Active"
      
      stateColor = Color(red: 0.114, green: 0.714, blue: 0.529)
      stateBorderColor = stateColor.opacity(0.3)
    } else {
      isActive = false
      
      timePrefix = "Starts"
      state = "Pending"
      
      stateColor = Color(red: 0.55, green: 0.55, blue: 0.55)
      stateBorderColor = Color(red: 0.80, green: 0.80, blue: 0.80)
    }
  }
  
  var body: some View {
    switch displayType {
    case .compact:
      if (proposal.state == "ACTIVE") {
        compact
      }
    case .full:
      full
    }
  }
  
  var compact: some View {
    return HStack(alignment: .center, spacing: 4) {
      ZStack {
        Text("\(timePrefix) \(endsIn)")
          .font(.system(size: 10, weight: .bold))
          .foregroundColor(timeColor)
          .padding(.horizontal, 2)
      }
      .cornerRadius(2)
      .overlay(
        RoundedRectangle(cornerRadius: 2)
          .stroke(
            timeBorderColor,
            lineWidth: 1
          )
      )
      Text(proposal.title)
        .font(.system(size: 12, weight: .semibold))
        .lineLimit(1)
    }
  }
  
  var full: some View {
    VStack(alignment: .leading, spacing: 2) {
      Text("\(proposal.number) • \(proposal.title)")
        .font(.system(size: 12, weight: .semibold))
        .lineLimit(1)
      HStack(alignment: .center, spacing: 4) {
        BoxText(
          text: state,
          textColor: stateColor,
          borderColor: stateBorderColor
        )
        BoxText(
          text: "\(timePrefix) \(endsIn)",
          textColor: timeColor,
          borderColor: timeBorderColor
        )
        if (isActive) {
          BoxText(
            text: String(proposal.votes!.yes),
            textColor: Color(red: 0.114, green: 0.714, blue: 0.529),
            borderColor: Color(red: 0.114, green: 0.714, blue: 0.529, opacity: 0.3)
          )
          BoxText(
            text: String(proposal.votes!.abstain),
            textColor: Color(red: 0.55, green: 0.55, blue: 0.55),
            borderColor: Color(red: 0.80, green: 0.80, blue: 0.80)
          )
          BoxText(
            text: String(proposal.votes!.no),
            textColor: Color(red: 0.941, green: 0.196, blue: 0.196),
            borderColor: Color(red: 0.941, green: 0.196, blue: 0.196, opacity: 0.3)
          )
          BoxText(
            text: String(proposal.quorum),
            prefix: "Quorum:",
            textColor: Color(red: 0.55, green: 0.55, blue: 0.55),
            prefixColor: Color(red: 0.80, green: 0.80, blue: 0.80),
            borderColor: Color(red: 0.80, green: 0.80, blue: 0.80)
          )
        }
      }
    }.padding(.bottom, 2)
  }
}

struct BoxText: View {
  let text: String
  let prefix: String?
  
  let textColor: Color
  let prefixColor: Color?
  
  let borderColor: Color
  
  init(
    text: String,
    prefix: String? = nil,
    textColor: Color,
    prefixColor: Color? = nil,
    borderColor: Color
  ) {
    self.text = text
    self.prefix = prefix
    self.textColor = textColor
    self.prefixColor = prefixColor
    self.borderColor = borderColor
  }
  
  var body: some View {
    ZStack {
      HStack(alignment: .center, spacing: 0) {
        if (prefix != nil) {
          Text(prefix!)
            .font(.system(size: 10, weight: .bold))
            .foregroundColor(prefixColor != nil ? prefixColor : textColor)
            .padding(.leading, 2)
        }
        Text(text)
          .font(.system(size: 10, weight: .bold))
          .foregroundColor(textColor)
          .padding(.horizontal, 2)
      }
    }
    .cornerRadius(2)
    .overlay(
      RoundedRectangle(cornerRadius: 2)
        .stroke(
          borderColor,
          lineWidth: 1
        )
    )
  }
}