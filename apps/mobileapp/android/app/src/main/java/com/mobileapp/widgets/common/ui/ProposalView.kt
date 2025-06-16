package com.mobileapp.widgets.common.ui

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceModifier
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.padding
import androidx.glance.layout.width
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.models.ProposalData
import java.util.concurrent.TimeUnit
import androidx.glance.color.ColorProvider

@Composable
fun ProposalView(proposal: ProposalData, isLightTheme: Boolean) {
    val endsIn = getRelativeTime(proposal.endTime)
    val isActive = proposal.state == "ACTIVE"

    val stateText = if (isActive) "Active" else "Pending"
    val stateColor = if (isActive) Color(0xFF1DB087) else Color(0xFF8C8C8C)
    val stateBorderColor = stateColor.copy(alpha = 0.3f)

    val timePrefix = if (isActive) "Ends" else "Starts"
    val timeLeft = (proposal.endTime * 1000 - System.currentTimeMillis()).coerceAtLeast(0.0)
    val isEndingSoon = timeLeft <= TimeUnit.HOURS.toMillis(12) && isActive
    val timeColor = if (isEndingSoon) Color(0xFFF03232) else Color(0xFF8C8C8C)
    val timeBorderColor = if (isEndingSoon) timeColor.copy(alpha = 0.3f) else if (isLightTheme) Color(0xFFCCCCCC) else Color(0xFF333333)

    val ordinaryBorderColor = if (isLightTheme) Color(0xFFCCCCCC) else Color(0xFF333333)

    Column(modifier = GlanceModifier.padding(vertical = 4.dp)) {
        Text(
            text = "${proposal.number} • ${proposal.title}",
            style = TextStyle(fontSize = 12.sp, fontWeight = FontWeight.Medium, color = ColorProvider(Color.Black, Color.White)),
            maxLines = 1
        )
        Row(modifier = GlanceModifier.padding(top = 4.dp)) {
            BoxText(text = stateText, textColor = stateColor, borderColor = stateBorderColor)
            Spacer(modifier = GlanceModifier.width(4.dp))
            BoxText(text = "$timePrefix $endsIn", textColor = timeColor, borderColor = timeBorderColor)
            if (isActive && proposal.votes != null) {
                Spacer(modifier = GlanceModifier.width(6.dp))
                BoxText(text = proposal.votes.yes.toString(), textColor = Color(0xFF1DB087), borderColor = Color(0x4D1DB087))
                Spacer(modifier = GlanceModifier.width(4.dp))
                BoxText(text = proposal.votes.abstain.toString(), textColor = Color(0xFF8C8C8C), borderColor = ordinaryBorderColor)
                Spacer(modifier = GlanceModifier.width(4.dp))
                BoxText(text = proposal.votes.no.toString(), textColor = Color(0xFFF03232), borderColor = Color(0x4DF03232))
                Spacer(modifier = GlanceModifier.width(6.dp))
                BoxText(
                    text = proposal.quorum.toString(),
                    prefix = "Quorum:",
                    textColor = Color(0xFF8C8C8C),
                    borderColor = ordinaryBorderColor,
                    prefixColor = ordinaryBorderColor
                )
            }
        }
    }
}

@Composable
private fun BoxText(
    text: String,
    textColor: Color,
    borderColor: Color,
    prefix: String? = null,
    prefixColor: Color? = null
) {
    Row(
        modifier = GlanceModifier
//            .border(1.dp, ColorProvider(borderColor, borderColor))
            .padding(horizontal = 3.dp, vertical = 2.dp)
    ) {
        prefix?.let {
            Text(
                text = it,
                style = TextStyle(
                    color = ColorProvider(prefixColor ?: textColor, prefixColor ?: textColor),
                    fontSize = 8.sp,
                    fontWeight = FontWeight.Bold
                ),
                modifier = GlanceModifier.padding(end = 1.dp)
            )
        }
        Text(
            text = text,
            style = TextStyle(color = ColorProvider(textColor, textColor), fontSize = 8.sp, fontWeight = FontWeight.Bold)
        )
    }
}


// A simple relative time formatter. Android's built-in one requires a higher min SDK for widgets.
private fun getRelativeTime(epochSeconds: Double): String {
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
