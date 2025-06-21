package com.mobileapp.widgets.auctiongovernance.ui

import android.graphics.BitmapFactory
import android.util.Base64
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceModifier
import androidx.glance.Image
import androidx.glance.ImageProvider
import androidx.glance.LocalSize
import androidx.glance.action.clickable
import androidx.glance.appwidget.action.actionRunCallback
import androidx.glance.appwidget.cornerRadius
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.layout.*
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.common.formatSecondsToDhms
import com.mobileapp.widgets.models.AuctionData
import java.text.DateFormat
import java.util.Date
import com.mobileapp.widgets.auctiongovernance.RefreshActionCallback

@Composable
fun AuctionView(auction: AuctionData) {
    val remainingSeconds = (auction.endTime - (System.currentTimeMillis() / 1000)).coerceAtLeast(0)
    val hasBid = auction.currentBid > 0
    val size = LocalSize.current

    val imageBitmap = remember(auction.image) {
        if (auction.image.isNotBlank()) {
            try {
                val imageBytes = Base64.decode(auction.image, Base64.DEFAULT)
                BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
            } catch (e: Exception) {
                e.printStackTrace()
                null
            }
        } else {
            null
        }
    }

    Row(verticalAlignment = Alignment.Top) {
        if (imageBitmap != null) {
            Image(
                provider = ImageProvider(imageBitmap),
                contentDescription = "Auction item",
                modifier = GlanceModifier
                    .size(52.dp)
                    .cornerRadius(8.dp)
            )
        } else {
            Box(
                modifier = GlanceModifier
                    .size(52.dp)
                    .cornerRadius(8.dp)
                    .background(ColorProvider(Color.LightGray, Color.DarkGray))
            ) {}
        }

        Spacer(modifier = GlanceModifier.width(8.dp))

        Column(modifier = GlanceModifier.width(size.width * 0.36f)) {
            Text(
                "Auction #${auction.id}",
                style = TextStyle(
                    fontSize = 12.sp,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
            Text(
                text = formatSecondsToDhms(remainingSeconds),
                style = TextStyle(
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = GlanceModifier.clickable(
                    onClick = actionRunCallback<RefreshActionCallback>()
                )
            ) {
                Image(
                    provider = ImageProvider(com.mobileapp.R.drawable.refresh_icon),
                    contentDescription = "Last refreshed",
                    modifier = GlanceModifier.size(10.dp)
                )
                Spacer(modifier = GlanceModifier.width(2.dp))
                Text(
                    text = DateFormat.getTimeInstance(DateFormat.SHORT).format(Date()),
                    style = TextStyle(
                        fontSize = 10.sp,
                        color = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C))
                    )
                )
            }
        }

        Column(modifier = GlanceModifier.defaultWeight(), horizontalAlignment = Alignment.Start) {
            Text(
                if (remainingSeconds == 0L) "Winning bid" else "Current bid",
                style = TextStyle(
                    fontSize = 12.sp,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
            Text(
                if (hasBid) "Ξ ${auction.currentBid}" else "No bids",
                style = TextStyle(
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
            Text(
                "by: ${auction.bidder}",
                style = TextStyle(
                    fontSize = 10.sp,
                    color = ColorProvider(Color(0xFF8C8C8C), Color(0xFF8C8C8C))
                )
            )
        }
    }
} 