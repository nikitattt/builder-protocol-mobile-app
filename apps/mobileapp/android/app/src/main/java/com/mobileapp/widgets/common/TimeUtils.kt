package com.mobileapp.widgets.common

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