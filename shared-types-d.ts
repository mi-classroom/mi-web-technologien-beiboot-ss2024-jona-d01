declare module '@shared-types' {
  export type Image = {
    index: number
    source: string
    name: string
    selected: boolean
    showPreviewIcon: boolean
    showSkeleton: boolean
    opacity: number
  }
}