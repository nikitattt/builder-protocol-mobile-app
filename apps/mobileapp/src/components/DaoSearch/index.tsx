import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TextInput, View, Text } from 'react-native'
import { DaoSearchStatus, useDaoSearchStore } from '../../store/daoSearch'
import useDaoSearch from '../../hooks/useDaoSearch'

const DaoSearch = () => {
  const focusRequested = useDaoSearchStore(state => state.focusRequested)
  const setFocusRequested = useDaoSearchStore(state => state.setFocusRequested)
  const setSearchStatus = useDaoSearchStore(state => state.setSearchStatus)
  const setSearchResults = useDaoSearchStore(state => state.setSearchResults)
  const addToSearchResults = useDaoSearchStore(
    state => state.addToSearchResults
  )
  const clearSearchResults = useDaoSearchStore(
    state => state.clearSearchResults
  )

  const [searchText, setSearchText] = useState('')

  const inputRef = React.useRef<TextInput>(null)

  const { data, loading, error } = useDaoSearch(searchText)

  useEffect(() => {
    if (data) {
      setSearchStatus(DaoSearchStatus.SUCCESS)
      const daos = data.map(dao => ({
        name: dao.name,
        address: dao.tokenAddress,
        chainId: dao.chainId
      }))
      setSearchResults(daos)
    }
  }, [data, error])

  useEffect(() => {
    if (error) {
      setSearchStatus(DaoSearchStatus.ERROR)
    }
  }, [error])

  useEffect(() => {
    if (focusRequested) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      setFocusRequested(false)
    }
  }, [focusRequested])

  const handleChangeText = (text: any) => {
    setSearchText(text)

    if (text.length === 0) clearSearchResults()
  }

  const noDaos = data && data.length === 0

  return (
    <View className="mb-3 justify-center">
      <TextInput
        ref={inputRef}
        autoComplete="off"
        className="bg-grey-one px-3 h-9 rounded-lg"
        onChangeText={handleChangeText}
        value={searchText}
        placeholder="DAO name or address"
      />
      {loading && (
        <ActivityIndicator
          className="absolute top-2 right-2"
          size="small"
          color="#9D9D9D"
        />
      )}
      {error && (
        <View className="absolute top-0 h-9 right-2 justify-center">
          <Text className="text-red">Error happened • Try again</Text>
        </View>
      )}
      {noDaos && (
        <View className="absolute top-0 h-9 right-2 justify-center">
          <Text className="text-grey-four">No results</Text>
        </View>
      )}
    </View>
  )
}

export default DaoSearch
