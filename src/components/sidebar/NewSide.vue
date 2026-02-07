<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Balloon,
  Flame,
  Gamepad2,
  Gift,
  Home,
  PlayCircle,
  ShoppingBasket,
  Swords,
  Trophy,
} from "lucide-vue-next";

const mainItems = [
  { title: "Home", icon: Home },
  { title: "Rewards", icon: Gift },
  { title: "In-Play", icon: PlayCircle },
  { title: "Acca Builder", icon: Trophy, badge: "12" },
];

const sportsItems = [
  { title: "Soccer", icon: Balloon },
  { title: "Basketball", icon: ShoppingBasket },
  { title: "Boxing", icon: Swords },
  { title: "E-Sport", icon: Gamepad2 },
  { title: "Horse Racing", icon: Flame, active: true },
];
</script>

<template>
  <Sidebar class="bg-[#12171d] border-r border-white/5" variant="sidebar">
    <SidebarContent class="px-2 py-4">
      <!-- MAIN -->
      <SidebarGroup>
        <SidebarGroupLabel
          class="text-xs text-white/40 uppercase tracking-wide px-3 mb-2"
        >
          Application
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in mainItems" :key="item.title">
              <SidebarMenuButton
                class="h-10 gap-3 rounded-md px-3 text-sm text-white/80 hover:bg-white/5"
              >
                <component :is="item.icon" class="h-4 w-4 text-white/60" />
                <span>{{ item.title }}</span>

                <span
                  v-if="item.badge"
                  class="ml-auto text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400"
                >
                  {{ item.badge }}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- SPORTS -->
      <SidebarGroup class="mt-6">
        <SidebarGroupLabel
          class="text-xs text-white/40 uppercase tracking-wide px-3 mb-2"
        >
          Sports
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in sportsItems" :key="item.title">
              <SidebarMenuButton
                :class="[
                  'h-10 gap-3 rounded-md px-3 text-sm',
                  item.active
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5',
                ]"
              >
                <component
                  :is="item.icon"
                  class="h-4 w-4"
                  :class="item.active ? 'text-cyan-400' : 'text-white/50'"
                />
                <span>{{ item.title }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
