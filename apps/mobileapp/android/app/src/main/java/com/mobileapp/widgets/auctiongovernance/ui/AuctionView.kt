package com.mobileapp.widgets.auctiongovernance.ui

import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceModifier
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.width
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.models.AuctionData
import androidx.glance.color.ColorProvider
import androidx.glance.layout.Box
import androidx.glance.background
import androidx.glance.appwidget.cornerRadius
import androidx.glance.layout.padding
import androidx.glance.unit.ColorProvider
import com.mobileapp.widgets.common.getRelativeTime

@Composable
fun AuctionView(auction: AuctionData) {
    val endsIn = getRelativeTime(auction.endTime)

    Row {
        BoxText(
            text = "Current bid",
            textColor = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C)),
            borderColor = ColorProvider(Color(0xFFCCCCCC), Color(0xFF333333)),
        )
        Spacer(modifier = GlanceModifier.width(4.dp))
        BoxText(
            text = "Ξ ${"%.2f".format(auction.currentBid)}",
            textColor = ColorProvider(Color.Black, Color.White),
            borderColor = ColorProvider(Color(0xFFCCCCCC), Color(0xFF333333)),
        )
        Spacer(modifier = GlanceModifier.width(4.dp))
        BoxText(
            text = "Ends $endsIn",
            textColor = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C)),
            borderColor = ColorProvider(Color(0xFFCCCCCC), Color(0xFF333333)),
        )
    }
}

@Composable
private fun BoxText(
    text: String,
    textColor: ColorProvider,
    borderColor: ColorProvider,
) {
    Box(
        modifier = GlanceModifier
            .background(borderColor)
            .padding(all = 1.dp)
            .cornerRadius(4.dp)
    ) {
        Row(
            modifier = GlanceModifier
                .background(ColorProvider(Color.White, Color.Black))
                .padding(horizontal = 3.dp, vertical = 2.dp)
                .cornerRadius(3.dp)
        ) {
            Text(
                text = text,
                style = TextStyle(
                    color = textColor,
                    fontSize = 8.sp,
                    fontWeight = FontWeight.Bold
                )
            )
        }
    }
} 