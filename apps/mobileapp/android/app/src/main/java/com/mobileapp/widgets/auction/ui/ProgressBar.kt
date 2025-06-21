package com.mobileapp.widgets.auction.ui

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.glance.GlanceModifier
import androidx.glance.LocalSize
import androidx.glance.background
import androidx.glance.layout.Box
import androidx.glance.layout.fillMaxHeight
import androidx.glance.layout.fillMaxWidth
import androidx.glance.layout.height
import androidx.glance.appwidget.cornerRadius
import androidx.glance.color.ColorProvider
import androidx.compose.ui.unit.dp
import androidx.glance.layout.Row
import androidx.glance.layout.width
import kotlin.math.roundToInt


@Composable
fun ProgressBar(
    modifier: GlanceModifier = GlanceModifier,
    progress: Float,
) {
    val width = LocalSize.current.width
    val progressWidth = ((width.value - (16 * 2)) * progress).roundToInt().dp

    Log.d("WidgetDebug", "progress: $progress, width: $width, progressWidth: $progressWidth")

    Row(
        modifier = modifier
            .fillMaxWidth()
    ) {
        Box(
            modifier = GlanceModifier
                .height(12.dp)
                .width(progressWidth)
                .background(ColorProvider(Color.Black, Color.White))
                .cornerRadius(12.dp)
        ) {}
        Box(
            modifier = GlanceModifier
                .height(12.dp)
                .defaultWeight()
                .background(ColorProvider(Color(0xFFE0E0E0), Color(0xFF2C2C2E)))
                .cornerRadius(12.dp)
        ) {}
//        Box(
//            modifier = GlanceModifier
//                .height(12.dp)
//                .width(98.dp)
//                .background(ColorProvider(Color.Black, Color.White))
//                .cornerRadius(12.dp)
//        ) {}
//        Box(
//            modifier = GlanceModifier
//                .height(12.dp)
//                .width(12.dp)
//                .background(ColorProvider(Color(0xFFE0E0E0), Color(0xFF2C2C2E)))
//                .cornerRadius(12.dp)
//        ) {}
    }
} 