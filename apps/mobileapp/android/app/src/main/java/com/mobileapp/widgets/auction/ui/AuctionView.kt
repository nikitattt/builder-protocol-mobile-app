package com.mobileapp.widgets.auction.ui

import android.graphics.BitmapFactory
import android.util.Base64
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceModifier
import androidx.glance.Image
import androidx.glance.ImageProvider
import androidx.glance.action.clickable
import androidx.glance.appwidget.action.actionRunCallback
import androidx.glance.appwidget.cornerRadius
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.layout.*
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.auction.RefreshActionCallback
import com.mobileapp.widgets.common.formatSecondsToDhms
import com.mobileapp.widgets.models.AuctionData
import java.text.DateFormat
import java.util.Date
import kotlin.math.max

@Composable
fun AuctionView(auction: AuctionData, numberOfProposals: Int) {
    val remainingSeconds = (auction.endTime - (System.currentTimeMillis() / 1000)).coerceAtLeast(0)
    val hasBid = auction.currentBid > 0

    val timeToGo = max(0.0, auction.endTime.toDouble() - (System.currentTimeMillis() / 1000.0))
    val maxValue = auction.duration.toDouble()
    val progress = if (maxValue > 0) (timeToGo / maxValue).toFloat() else 0f

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

    Column(
        modifier = GlanceModifier.fillMaxSize(),
        verticalAlignment = Alignment.Vertical.Top,
        horizontalAlignment = Alignment.Horizontal.Start
    ) {
        Row(
            modifier = GlanceModifier.fillMaxWidth(),
            verticalAlignment = Alignment.Vertical.Top,
            horizontalAlignment = Alignment.Horizontal.Start
        ) {
            Column(
                horizontalAlignment = Alignment.Horizontal.CenterHorizontally,
                verticalAlignment = Alignment.Vertical.CenterVertically
            ) {
                if (imageBitmap != null) {
                    Image(
                        provider = ImageProvider(imageBitmap),
                        contentDescription = "Auction item",
                        modifier = GlanceModifier
                            .size(62.dp)
                            .cornerRadius(8.dp)
                    )
                } else {
                    Box(
                        modifier = GlanceModifier
                            .size(62.dp)
                            .cornerRadius(8.dp)
                            .background(ColorProvider(Color.LightGray, Color.DarkGray))
                    ) {}
                }
                Text(
                    text = auction.id.toString(),
                    style = TextStyle(
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = ColorProvider(Color.Black, Color.White)
                    ),
                    modifier = GlanceModifier.padding(top = 1.dp)
                )
            }

            Spacer(modifier = GlanceModifier.width(12.dp))

            Column(
                verticalAlignment = Alignment.Vertical.Top,
                horizontalAlignment = Alignment.Horizontal.Start
            ) {
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
                    ),
                )

                Spacer(GlanceModifier.height(1.dp))
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
        }

        Spacer(GlanceModifier.height(8.dp))

        Column(
            modifier = GlanceModifier.fillMaxWidth(),
            horizontalAlignment = Alignment.Horizontal.Start
        ) {
            Text(
                "Auction ends in",
                style = TextStyle(
                    fontSize = 12.sp,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )
            Text(
                text = formatSecondsToDhms(remainingSeconds),
                style = TextStyle(
                    fontSize = 22.sp,
                    fontWeight = FontWeight.Bold,
                    color = ColorProvider(Color.Black, Color.White)
                )
            )

            Spacer(modifier = GlanceModifier.height(4.dp))

            ProgressBar(
                progress = progress,
                modifier = GlanceModifier.padding(top = 2.dp)
            )
        }

        Spacer(GlanceModifier.defaultWeight())

        Text(
            if (numberOfProposals > 0) "$numberOfProposals proposals available" else "No proposals available" ,
            style = TextStyle(
                fontSize = 12.sp,
                color = ColorProvider(Color.Black, Color.White)
            )
        )
    }
} 