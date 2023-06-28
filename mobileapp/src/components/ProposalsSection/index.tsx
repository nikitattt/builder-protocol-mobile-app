import { ApolloError, useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { LinearGradient } from 'react-native-svg'
import { BuilderDAOsPropsResponse } from '../../utils/types'
import { PROPS_QUERY } from '../../utils/queries'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { SearchDao } from '../../store/daoSearch'
import { SavedDao } from '../../store/daos'
import { filterAndSortProposals } from '../../utils/proposals'
import ProposalCard from '../ProposalCard'
import Section from '../Section'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

type ProposalsSectionProps = {
  dao: SavedDao | SearchDao
  className?: string
}

const ProposalsSection = ({ dao, className }: ProposalsSectionProps) => {
  const navigation = useNavigation()

  const {
    data,
    loading,
    error,
    refetch
  }: {
    loading: boolean
    error?: ApolloError
    data?: BuilderDAOsPropsResponse
    refetch: () => void
  } = useQuery(PROPS_QUERY, {
    variables: {
      addresses: [dao.address],
      limit: 20
    },
    pollInterval: 600000
  })

  const props = data?.nouns.nounsProposals.nodes
  const proposals = props && filterAndSortProposals(props)

  return (
    <Section title="Proposals" className={className}>
      <View className="flex flex-col gap-3">
        {loading ? (
          <View className="h-12 bg-grey-one/30 rounded-lg">
            <ShimmerPlaceHolder
              duration={2500}
              width={400}
              style={{
                borderRadius: 8,
                width: '100%',
                height: '100%'
              }}
              shimmerWidthPercent={0.5}
              shimmerColors={[
                `rgba(242, 242, 242, 0.5)`,
                `rgba(231, 231, 231, 0.5)`,
                `rgba(242, 242, 242, 0.5)`
              ]}
            />
          </View>
        ) : error ? (
          <View className="border border-grey-one rounded-lg p-4">
            <Text className="text-red">Couldn't load proposals</Text>
          </View>
        ) : data && proposals && proposals.length > 0 ? (
          <FlatList
            data={proposals}
            renderItem={({ item, index }) => (
              <ProposalCard
                proposal={item}
                dao={dao}
                key={`${index}-${item.proposalId}`}
              />
            )}
            keyExtractor={item => item.proposalId}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
          />
        ) : (
          <View className="border border-grey-one rounded-lg p-4">
            <Text>No active or pending proposals ⌐◨-◨</Text>
          </View>
        )}
      </View>
    </Section>
  )
}

export default ProposalsSection