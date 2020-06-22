// Copyright (c) 2020 DevilTea
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

import { createThemeManager, ThemeManager } from '@/utils/theme'
import { createLanguageService, LanguageService } from '@/utils/language'
import { createBreakpointService, BreakpointService } from '@/utils/breakpoint'
import { createScrollLockManager, ScrollLockManager } from '@/utils/scrollLock'
import { createFullPageProgressService, FullPageProgressService } from '@/utils/fullPageProgress'
import { createPopupManager, PopupManager } from '@/utils/popup'
import { createMetaManager, MetaManager } from '@/utils/meta'
import { createAnnouncementService, AnnouncementService } from '@/utils/announcement'

import Icon from '@/components/Basic/Icon/index.vue'

Vue.component('Icon', Icon)

Vue.config.productionTip = false

const languageService: LanguageService = Vue.observable(createLanguageService())
const themeManager: ThemeManager = Vue.observable(createThemeManager())
const breakpointService: BreakpointService = Vue.observable(createBreakpointService())
const scrollLockManager: ScrollLockManager = Vue.observable(createScrollLockManager())
const fullPageProgressService: FullPageProgressService = Vue.observable(createFullPageProgressService(scrollLockManager))
const metaManager: MetaManager = Vue.observable(createMetaManager())
const popupManager: PopupManager = Vue.observable(createPopupManager({ scrollLockManager, metaManager }))
const announcementService: AnnouncementService = Vue.observable(createAnnouncementService({ languageService, popupManager }))

const router = createRouter({
  languageService,
  fullPageProgressService,
  metaManager
})

new Vue({
  provide: {
    languageService,
    themeManager,
    breakpointService,
    scrollLockManager,
    fullPageProgressService,
    popupManager,
    metaManager,
    announcementService
  },
  router,
  render: h => h(App)
}).$mount('#app')
