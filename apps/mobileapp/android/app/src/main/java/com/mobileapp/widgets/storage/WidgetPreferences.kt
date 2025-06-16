package com.mobileapp.widgets.storage

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "widget_prefs")

class WidgetPreferences(private val context: Context) {

    fun getDaoAddress(appWidgetId: Int): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[stringPreferencesKey("dao_address_$appWidgetId")]
        }
    }

    fun getDaoName(appWidgetId: Int): Flow<String?> {
        return context.dataStore.data.map { preferences ->
            preferences[stringPreferencesKey("dao_name_$appWidgetId")]
        }
    }

    fun getChainId(appWidgetId: Int): Flow<Int?> {
        return context.dataStore.data.map { preferences ->
            preferences[intPreferencesKey("chain_id_$appWidgetId")]
        }
    }

    suspend fun saveConfiguration(appWidgetId: Int, address: String, name: String, chainId: Int) {
        context.dataStore.edit { preferences ->
            preferences[stringPreferencesKey("dao_address_$appWidgetId")] = address
            preferences[stringPreferencesKey("dao_name_$appWidgetId")] = name
            preferences[intPreferencesKey("chain_id_$appWidgetId")] = chainId
        }
    }

    suspend fun deleteConfiguration(appWidgetId: Int) {
        context.dataStore.edit { preferences ->
            preferences.remove(stringPreferencesKey("dao_address_$appWidgetId"))
            preferences.remove(stringPreferencesKey("dao_name_$appWidgetId"))
            preferences.remove(intPreferencesKey("chain_id_$appWidgetId"))
        }
    }
} 