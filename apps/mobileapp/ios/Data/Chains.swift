//
//  Chains.swift
//  mobileapp
//
//  Created by NG on 22.07.2024.
//

import Foundation

enum ChainID: Int {
  case ethereum = 1
  case optimism = 10
  case base = 8453
  case zora = 7777777
  
  var stringValue: String {
    switch self {
    case .ethereum: return "ethereum"
    case .optimism: return "optimism"
    case .base: return "base"
    case .zora: return "zora"
    }
  }
}
