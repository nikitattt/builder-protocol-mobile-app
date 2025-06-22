package com.mobileapp.widgets.common

import java.util.concurrent.TimeUnit

// A simple relative time formatter. Android's built-in one requires a higher min SDK for widgets.
fun getRelativeTime(epochSeconds: Double): String {
    val timeMillis = epochSeconds.toLong() * 1000
    val now = System.currentTimeMillis()
    val diff = timeMillis - now

    if (diff < 0) {
        // In the past
        val seconds = -diff / 1000
        val minutes = seconds / 60
        val hours = minutes / 60
        val days = hours / 24
        return when {
            days > 0 -> "$days${"d ago"}"
            hours > 0 -> "$hours${"h ago"}"
            minutes > 0 -> "$minutes${"m ago"}"
            else -> "$seconds${"s ago"}"
        }
    } else {
        // In the future
        val seconds = diff / 1000
        val minutes = seconds / 60
        val hours = minutes / 60
        val days = hours / 24
        return when {
            days > 0 -> "in $days${"d"}"
            hours > 0 -> "in $hours${"h"}"
            minutes > 0 -> "in $minutes${"m"}"
            else -> "in $seconds${"s"}"
        }
    }
}

fun formatSecondsToDhms(totalSeconds: Long): String {
    if (totalSeconds <= 0) return "Ended"
    val days = TimeUnit.SECONDS.toDays(totalSeconds)
    val hours = TimeUnit.SECONDS.toHours(totalSeconds) % 24
    val minutes = TimeUnit.SECONDS.toMinutes(totalSeconds) % 60
    val seconds = totalSeconds % 60

    val parts = mutableListOf<String>()
    if (days > 0) {
        parts.add("${days}d")
        parts.add("${hours}h")
        parts.add("${minutes}m")
        parts.add("${seconds}s")
    } else if (hours > 0) {
        parts.add("${hours}h")
        parts.add("${minutes}m")
        parts.add("${seconds}s")
    } else if (minutes > 0) {
        parts.add("${minutes}m")
        parts.add("${seconds}s")
    } else {
        parts.add("${seconds}s")
    }

    return parts.joinToString(" ")
} 