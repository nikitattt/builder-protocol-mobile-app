import { ProposalSubgraphEntity } from '../types/shared'

export const getProposalState = (
  blockNumber: number,
  proposal: ProposalSubgraphEntity
) => {
  const status = proposal.status
  if (status === 'PENDING') {
    if (blockNumber <= parseInt(proposal.startBlock)) {
      return 'PENDING'
    }
    return 'ACTIVE'
  }
  if (status === 'ACTIVE') {
    if (blockNumber > parseInt(proposal.endBlock)) {
      return null
    }
    return 'ACTIVE'
  }
  return null
}

export const getProposalTitle = (proposal: ProposalSubgraphEntity) => {
  const titleEnd = proposal.description.indexOf('\n\n')

  return proposal.description.substring(2, titleEnd)
}

type ProposalTitleSource = {
  title?: string | null
  description?: string | null
}

type ProposalMetadataTitle = {
  title?: unknown
}

const parseProposalMetadataTitle = (title: string) => {
  try {
    const parsed = JSON.parse(title) as ProposalMetadataTitle

    return typeof parsed.title === 'string' && parsed.title.trim()
      ? parsed.title.trim()
      : null
  } catch {
    return null
  }
}

const getTitleFromDescription = (description: string) => {
  const trimmed = description.trim()

  if (!trimmed) return null

  const firstLine = trimmed.split('\n')[0]?.trim()
  if (!firstLine) return null

  return firstLine.replace(/^#+\s*/, '').trim() || null
}

export const getDisplayProposalTitle = ({
  title,
  description
}: ProposalTitleSource) => {
  const normalizedTitle = title?.trim()

  if (normalizedTitle) {
    const metadataTitle = parseProposalMetadataTitle(normalizedTitle)
    if (metadataTitle) return metadataTitle

    return normalizedTitle
  }

  if (description) {
    const descriptionTitle = getTitleFromDescription(description)
    if (descriptionTitle) return descriptionTitle
  }

  return 'Untitled proposal'
}

export const getProposalEndTimestamp = (
  blockNumber: number,
  state: string,
  proposal: ProposalSubgraphEntity
) => {
  let blocksToGo
  if (state === 'ACTIVE') {
    blocksToGo = parseInt(proposal.endBlock) - blockNumber
  } else {
    blocksToGo = parseInt(proposal.startBlock) - blockNumber
  }

  return Date.now() + blocksToGo * 12 * 1000
}
