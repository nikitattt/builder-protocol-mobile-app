package com.mobileapp.widgets.screens

import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.glance.appwidget.GlanceAppWidgetManager
import androidx.glance.appwidget.state.updateAppWidgetState
import androidx.lifecycle.lifecycleScope
import com.mobileapp.widgets.common.DaoConfig
import com.mobileapp.widgets.common.DaoWidgetStateDefinition
import com.mobileapp.widgets.governance.GovernanceWidget
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.json.JSONArray

class DaoWidgetConfigureActivity : ComponentActivity() {

    private var appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        intent.extras?.let {
            appWidgetId = it.getInt(
                AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID
            )
        }

        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish()
            return
        }

        setContent {
            var daos by remember { mutableStateOf<List<DAOData>>(emptyList()) }

            LaunchedEffect(Unit) {
                val context = this@DaoWidgetConfigureActivity
                val sharedPreferences = context.getSharedPreferences(
                    "group.com.nouns.ng.builder.daos",
                    MODE_PRIVATE
                )
                val savedDaosJson = sharedPreferences.getString("saved", "[]")

                if (savedDaosJson != null) {
                    val jsonArray = JSONArray(savedDaosJson)
                    val daosList = mutableListOf<DAOData>()
                    for (i in 0 until jsonArray.length()) {
                        val daoJson = jsonArray.getJSONObject(i)
                        daosList.add(
                            DAOData(
                                name = daoJson.getString("name"),
                                address = daoJson.getString("address"),
                                chainId = daoJson.getInt("chainId"),
                            )
                        )
                    }
                    daos = daosList
                }
            }

            ConfigureUi(daos = daos, onDaoSelected = { dao ->
                lifecycleScope.launch {
                    onDaoSelected(dao)
                }
            })
        }
    }

    private suspend fun onDaoSelected(dao: DAOData) {
        val context = this
        val glanceId = GlanceAppWidgetManager(context).getGlanceIdBy(appWidgetId)

        updateAppWidgetState(
            context = context,
            definition = DaoWidgetStateDefinition,
            glanceId = glanceId,
            updateState = {
                DaoConfig(
                    daoAddress = dao.address,
                    daoName = dao.name,
                    chainId = dao.chainId
                )
            }
        )

        GovernanceWidget().update(applicationContext, glanceId)

        val resultValue = Intent().putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
        setResult(Activity.RESULT_OK, resultValue)
        finish()
    }
}

@Composable
fun ConfigureUi(daos: List<DAOData>, onDaoSelected: (DAOData) -> Unit) {
    val title = if (daos.isEmpty()) "No DAOs" else "Select DAO"

    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(title, style = MaterialTheme.typography.headlineLarge)
                Spacer(modifier = Modifier.height(16.dp))

                if (daos.isEmpty()) {
                    Box(
                        modifier = Modifier.fillMaxSize(),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            "Bookmark DAOs in the app to track them in this widget",
                            style = MaterialTheme.typography.bodyLarge,
                            textAlign = TextAlign.Center
                        )
                    }
                } else {
                    LazyColumn {
                        items(daos) { dao ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(color = MaterialTheme.colorScheme.surfaceVariant)
                                    .clickable { onDaoSelected(dao) }
                            ) {
                                Text(
                                    dao.name,
                                    style = MaterialTheme.typography.bodyLarge,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    modifier = Modifier.padding(
                                        vertical = 20.dp,
                                        horizontal = 12.dp
                                    )
                                )
                            }
                            Spacer(modifier = Modifier.height(12.dp))
                        }
                    }
                }
            }
        }
    }
}

@Serializable
data class DAOData(val name: String, val address: String, val chainId: Int)