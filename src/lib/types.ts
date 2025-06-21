export interface WalletApi {
  getRewardAddresses: () => Promise<string[]>
  getNetworkId: () => Promise<number>
}

export interface Credential {
  id: string
  name: string
  subjectId: string
  [key: string]: unknown
}

export interface Proof {
  proof: string
}
