//
//  Double.swift
//  mobileapp
//
//  Created by NG on 14.07.2024.
//

import Foundation

extension Double {
    func toThreeDecimalPlaces() -> Double {
        let stringRepresentation = String(format: "%.3f", self)
        return Double(stringRepresentation) ?? self
    }
}
