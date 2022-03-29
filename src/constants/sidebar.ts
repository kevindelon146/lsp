import { lspAppRoutes } from '@lib/constants'
import { ILeftSideBarLink } from '@lib/components'

export const LEFT_SIDEBAR_LINKS: ILeftSideBarLink[] = [
  {
    name: `profile`,
    icon: `fal fa-user fa-lg`,
    route: lspAppRoutes.dashboard,
  },
  {
    name: `file-storage`,
    icon: `fal fa-folder-open fa-lg`,
    route: lspAppRoutes.fileStorage,
    useATag: true,
  },
  {
    name: `scripts`,
    icon: `fal fa-scroll-old fa-lg`,
    route: lspAppRoutes.scripts,
    useATag: true,
  },
  {
    name: `Dev Project`,
    icon: `fal fa-brackets-curly`,
    route: lspAppRoutes.developer,
  },
]
