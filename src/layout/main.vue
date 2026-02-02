<template>
  <div class="flex min-h-screen bg-gray-100">
    <aside
      class="w-[280px] bg-white border-r border-gray-200 fixed top-0 left-0 h-screen overflow-y-auto transition-transform duration-300 z-40"
      :class="
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      "
    >
      <div class="flex flex-col h-full p-4">
        <router-link
          to="/"
          class="block text-center mb-6 text-2xl font-bold text-blue-500 hover:text-blue-600 no-underline"
        >
          medica
        </router-link>

        <nav class="flex-1 overflow-y-auto">
          <div v-for="(menuGr, idx) in mainMenu" :key="idx" class="mb-2">
            <div
              class="flex items-center px-4 py-3 rounded-lg cursor-pointer font-semibold text-sm text-gray-700 transition-all relative"
              :class="
                isSelected(menuGr.group, menuGr.name, true)
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              "
              @click="toggleMenu(idx)"
            >
              <span
                class="absolute left-[-16px] w-1 h-10 rounded-r transition-colors"
                :class="
                  isSelected(menuGr.group, menuGr.name, true)
                    ? 'bg-blue-500'
                    : 'bg-transparent'
                "
              ></span>
              <component
                v-if="menuGr.icon"
                :is="menuGr.icon"
                :size="20"
                class="mr-3"
              />
              <span class="flex-1">{{ menuGr.title }}</span>
              <svg
                v-if="menuGr.submenu && menuGr.submenu.length"
                class="w-4 h-4 transition-transform"
                :class="openMenus.includes(menuGr.name) ? 'rotate-180' : ''"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <transition
              enter-active-class="transition-all duration-300 ease-out"
              leave-active-class="transition-all duration-300 ease-in"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[500px]"
              leave-from-class="opacity-100 max-h-[500px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="
                  menuGr.submenu &&
                  menuGr.submenu.length &&
                  openMenus.includes(menuGr.name)
                "
                class="pl-8 mt-1 space-y-1 overflow-hidden"
              >
                <router-link
                  v-for="(p, i) in menuGr.submenu"
                  :key="i"
                  :to="p.url"
                  class="block px-4 py-2 text-sm text-gray-600 no-underline border-l-2 border-gray-200 transition-all mb-1 hover:text-blue-500 hover:bg-gray-100"
                  :class="
                    isSelected(p.group, p.name, false)
                      ? 'text-blue-500 border-blue-500 font-semibold'
                      : ''
                  "
                  @click="closeSidebarOnMobile"
                >
                  {{ p.title }}
                </router-link>
              </div>
            </transition>
          </div>
        </nav>

        <div class="mt-auto pt-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-3 bg-transparent border-none rounded-lg text-red-500 font-semibold text-sm cursor-pointer transition-colors hover:bg-red-50"
          >
            <svg
              class="w-5 h-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <div class="flex-1 ml-0 lg:ml-[280px] flex flex-col">
      <header
        class="flex items-center justify-between px-6 py-4 md:bg-gray-100 bg-white md:border-none border-b border-gray-200 sticky top-0 z-30"
      >
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 bg-transparent border-none cursor-pointer text-gray-700"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h2 class="text-lg font-semibold">{{ pageTitle }}</h2>

        <div class="relative ml-auto" @click="toggleProfileDropdown">
          <div
            class="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer"
          >
            <div
              class="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center text-white"
            >
              <Account :size="24" />
            </div>
          </div>

          <transition
            enter-active-class="transition-all duration-200 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="profileDropdownOpen"
              class="absolute top-[calc(100%+8px)] right-0 min-w-[240px] bg-white rounded-xl shadow-xl p-2 z-50"
            >
              <div class="px-4 py-3">
                <p class="text-sm font-semibold text-gray-900 m-0">
                  {{ userName }}
                </p>
                <p class="text-xs text-gray-600 mt-1 m-0 capitalize">
                  {{ userRole }}
                </p>
              </div>
              <div class="h-px bg-gray-200 my-2"></div>
              <router-link
                to="/profile"
                class="flex items-center gap-3 w-full px-4 py-2.5 bg-transparent border-none rounded-lg no-underline text-gray-700 text-sm cursor-pointer transition-all hover:bg-gray-100 hover:text-blue-500"
                @click="closeProfileDropdown"
              >
                <Account :size="18" />
                <span>My Profile</span>
              </router-link>
              <div class="h-px bg-gray-200 my-2"></div>
              <button
                @click="handleLogout"
                class="flex items-center gap-3 w-full px-4 py-2.5 bg-transparent border-none rounded-lg text-red-500 text-sm cursor-pointer transition-all hover:bg-red-50 hover:text-red-600 text-left"
              >
                <svg
                  class="w-[18px] h-[18px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </transition>
        </div>
      </header>

      <div class="flex-1 p-6">
        <slot />
      </div>
    </div>

    <div
      v-if="sidebarOpen"
      class="lg:hidden fixed inset-0 bg-black/50 z-35"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMenuForCurrentContext } from "../constants/menus.js";

import ViewDashboard from "vue-material-design-icons/ViewDashboard.vue";
import AccountMultiple from "vue-material-design-icons/AccountMultiple.vue";
import Flask from "vue-material-design-icons/Flask.vue";
import ClipboardText from "vue-material-design-icons/ClipboardText.vue";
import Account from "vue-material-design-icons/Account.vue";
import Cog from "vue-material-design-icons/Cog.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    ViewDashboard,
    AccountMultiple,
    Flask,
    ClipboardText,
    Account,
    Cog,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const pageTitle = computed(() => route.meta.title || "Dashboard");

    const currentMenu = getMenuForCurrentContext();
    const openMenus = ref([]);
    const sidebarOpen = ref(false);
    const profileDropdownOpen = ref(false);

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userName = ref(user?.name || user?.email || "Guest");
    const userRole = ref(user?.role || "User");

    const toggleProfileDropdown = () => {
      profileDropdownOpen.value = !profileDropdownOpen.value;
    };

    const closeProfileDropdown = () => {
      profileDropdownOpen.value = false;
    };

    const isSelected = (group, name, parent) => {
      if (parent) {
        return group === route.meta.group;
      }
      return name === route.name;
    };

    const toggleMenu = (index) => {
      const menuGr = currentMenu[index];

      if (!menuGr.submenu || menuGr.submenu.length === 0) {
        router.push(menuGr.url);
        closeSidebar();
        return;
      }

      const menuIndex = openMenus.value.indexOf(menuGr.name);
      if (menuIndex > -1) {
        openMenus.value.splice(menuIndex, 1);
      } else {
        openMenus.value.push(menuGr.name);
      }
    };

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };

    const closeSidebar = () => {
      sidebarOpen.value = false;
    };

    const closeSidebarOnMobile = () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push({ name: "login" });
    };

    onMounted(() => {
      const activeGroup = currentMenu.find(
        (menu) => menu.group === route.meta.group,
      );
      if (
        activeGroup &&
        activeGroup.submenu &&
        activeGroup.submenu.length > 0
      ) {
        openMenus.value.push(activeGroup.name);
      }
    });

    watch(
      () => route.meta.group,
      (newGroup) => {
        const activeGroup = currentMenu.find((menu) => menu.group === newGroup);
        if (
          activeGroup &&
          activeGroup.submenu &&
          activeGroup.submenu.length > 0 &&
          !openMenus.value.includes(activeGroup.name)
        ) {
          openMenus.value.push(activeGroup.name);
        }
      },
    );

    return {
      mainMenu: currentMenu,
      openMenus,
      sidebarOpen,
      profileDropdownOpen,
      userName,
      userRole,
      pageTitle,
      isSelected,
      toggleMenu,
      toggleSidebar,
      closeSidebar,
      closeSidebarOnMobile,
      toggleProfileDropdown,
      closeProfileDropdown,
      handleLogout,
    };
  },
});
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background-color: #f3f4f6;
}

.sidebar {
  width: 280px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 40;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 16px;
}

.brand {
  display: block;
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.brand:hover {
  color: #2563eb;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  margin-bottom: 24px;
  color: white;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  backdrop-filter: blur(10px);
}

.profile-info {
  flex: 1;
  overflow: hidden;
}

.profile-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-role {
  font-size: 12px;
  margin: 2px 0 0 0;
  opacity: 0.9;
  text-transform: capitalize;
}

.brand img {
  max-width: 150px;
  height: auto;
}

.navigation {
  flex: 1;
  overflow-y: auto;
}

.menu-group {
  margin-bottom: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s ease;
  position: relative;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item.selected {
  background-color: #3b82f6;
  color: white;
}

.active-indicator {
  position: absolute;
  left: -16px;
  width: 4px;
  height: 40px;
  background-color: transparent;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.2s ease;
}

.menu-item.selected .active-indicator {
  background-color: #3b82f6;
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

.menu-label {
  flex: 1;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.chevron-icon.chevron-open {
  transform: rotate(180deg);
}

.submenu {
  padding-left: 32px;
  margin-top: 4px;
  overflow: hidden;
}

.submenu-item {
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  border-left: 2px solid #e5e7eb;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.submenu-item:hover {
  color: #3b82f6;
  background-color: #f3f4f6;
}

.submenu-item.selected {
  color: #3b82f6;
  border-left-color: #3b82f6;
  font-weight: 600;
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 500px;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #ef4444;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-btn:hover {
  background-color: #fef2f2;
}

.logout-btn .menu-icon {
  margin-right: 12px;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  display: flex;
  flex-direction: column;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 30;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #374151;
}

.menu-toggle svg {
  width: 24px;
  height: 24px;
}

.mobile-logo {
  display: none;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #3b82f6;
  letter-spacing: -0.5px;
}

.profile-dropdown {
  position: relative;
  margin-left: auto;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.profile-trigger:hover {
  background-color: #f3f4f6;
}

.profile-avatar-small {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.profile-name-desktop {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.chevron-icon-small {
  width: 16px;
  height: 16px;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.chevron-icon-small.chevron-open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 240px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 50;
}

.dropdown-header {
  padding: 12px 16px;
}

.dropdown-user-name {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.dropdown-user-role {
  font-size: 12px;
  color: #6b7280;
  margin: 4px 0 0 0;
  text-transform: capitalize;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: #f3f4f6;
  color: #3b82f6;
}

.dropdown-item.logout-item {
  color: #ef4444;
}

.dropdown-item.logout-item:hover {
  background: #fef2f2;
  color: #dc2626;
}

/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-content {
  flex: 1;
  padding: 24px;
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .menu-toggle {
    display: block;
  }

  .mobile-logo {
    display: block;
    flex: 1;
    text-align: center;
  }

  .profile-name-desktop {
    display: none;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 35;
  }
}
</style>
