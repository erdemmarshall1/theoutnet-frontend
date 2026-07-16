<template>
  <div class="ton-header">
    <div id="infoBar" class="ton-info-bar desktop-only">
      <div class="ton-info-bar-wrapper">
        <div class="ton-info-bar-courtesy">
          <div class="ton-info-bar-left">
            <span class="ton-info-bar-signin" v-if="!store.isLogin" @click="$router.push('/login')">
              <i class="ton-icon-person"></i>
              <span class="ton-signin-text">Sign In</span>
            </span>
            <span class="ton-info-bar-user" v-else @click="$router.push('/myaccount')">
              <i class="ton-icon-person"></i>
              <span class="ton-signin-text">{{ store.userInfo.username }}</span>
            </span>
            <span class="ton-info-bar-locale" @click="$router.push('/locales')">
              <span class="ton-flag-placeholder">🌐</span>
              <span class="ton-locale-text">{{ currentLangName }}</span>
            </span>
          </div>
          <div class="ton-info-bar-right">
            <a href="javascript:void(0)" @click="$router.push('/ordertracking')">Track Your Order</a>
            <a href="javascript:void(0)" @click="$router.push('/myorder')">Create A Return</a>
            <a href="javascript:void(0)" @click="$router.push('/main')">Customer Care</a>
            <a href="javascript:void(0)" @click="$router.push('/main')">Delivery</a>
            <a href="javascript:void(0)" @click="$router.push('/main')">Returns</a>
          </div>
        </div>
        <div class="ton-promo-bar">
          <div class="ton-promo-bar-container">
            <span>Subscribe and get 10% off your next order now</span>
            <a href="javascript:void(0)" @click="$router.push('/register')" class="ton-promo-link">Exclusions apply – see T&Cs</a>
          </div>
        </div>
      </div>
    </div>

    <header id="header" class="ton-header-main">
      <div class="ton-header-container">
        <button class="ton-hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <svg width="25" height="18" viewBox="0 0 24.6 18"><path d="M0 2.1V0h24.6v2.1H0zm0 8V7.9h24.6V10H0zM0 18v-2.1h24.6V18H0z"/></svg>
        </button>

        <div class="ton-gender-switch desktop-only">
          <span class="ton-gender-active">Women</span>
          <span class="ton-gender-divider"></span>
          <span class="ton-gender-link">Men</span>
        </div>

        <div class="ton-account-mobile mobile-only" @click="$router.push(store.isLogin ? '/myaccount' : '/login')">
          <svg width="18" height="20" viewBox="0 0 18 20"><g fill-rule="evenodd"><path d="M10.616 10.549A7.111 7.111 0 0012.15 9C15.563 10.517 18 14.428 18 19.002V20H0v-.998c0-4.514 2.373-8.382 5.717-9.94a6.03 6.03 0 001.389 1.574c-2.737.931-4.812 3.83-5.145 7.368H16.04c-.344-3.657-2.55-6.63-5.423-7.455z"/><path d="M9.5 2c-.922 0-1.844.415-2.53 1.138-.713.751-1.06 1.74-.95 2.71.17 1.664 1.137 2.946 1.985 3.594.598.456 1.105.583 1.38.554.912-.122 3.34-1.732 3.594-4.141l.001-.007c.11-.97-.237-1.959-.95-2.71C11.344 2.415 10.422 2 9.5 2m-.19 10c-.836 0-1.725-.347-2.559-.993-1.508-1.173-2.526-3.03-2.72-4.967-.17-1.521.36-3.072 1.452-4.243C6.548.656 8.012 0 9.5 0c1.488 0 2.952.656 4.018 1.797 1.092 1.171 1.62 2.72 1.451 4.25-.337 3.222-3.38 5.666-5.329 5.934a2.772 2.772 0 01-.33.019"/></g></svg>
        </div>

        <a href="/main" class="ton-logo" aria-label="THE OUTNET logo"></a>

        <div class="ton-header-icons">
          <div class="ton-search desktop-only" @click="$router.push('/searchgoods')">
            <svg width="20" height="20" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M20 18.465L18.468 20l-5.982-5.996a7.765 7.765 0 01-4.711 1.593C3.497 15.597 0 12.093 0 7.791 0 3.505 3.497 0 7.775 0c4.277 0 7.789 3.505 7.789 7.791 0 1.753-.578 3.36-1.561 4.664L20 18.465zM2.182 7.79c0 3.1 2.515 5.62 5.593 5.62s5.606-2.52 5.606-5.62c0-3.084-2.528-5.604-5.606-5.604S2.182 4.707 2.182 7.79z"/></svg>
            <span class="ton-search-text">Search</span>
          </div>
          <div class="ton-wishlist desktop-only" @click="$router.push('/mywishlist')">
            <svg width="20" height="19" viewBox="0 0 20.3 19.3"><path d="M10.1 19.3c-1.2-1.2-3.8-3.6-5.2-4.9C2.6 12.3 0 9.5 0 6c0-3.7 2.7-6 5.7-6 2.4 0 3.9 1.5 4.4 2.3.5-.8 2-2.3 4.4-2.3 3 0 5.7 2.4 5.7 6 0 3.5-2.6 6.3-4.9 8.4-1.4 1.3-4 3.8-5.2 4.9zm0-2.9c.6-.5 2.2-1.8 3.9-3.4 2.6-2.5 4.1-4.7 4.1-6.9 0-2-1.2-3.9-3.7-3.9C12 2.1 11 4 10.1 5.9 9.3 4 8.3 2.1 5.9 2.1 3.4 2.1 2.2 4 2.2 6c0 2.2 1.5 4.4 4.1 6.9 1.2 1.3 2.5 2.4 3.8 3.5z"/></svg>
          </div>
          <div class="ton-cart" @click="$router.push('/car')">
            <svg width="28" height="24" viewBox="0 0 28 23.7"><path d="M26.3 6.7l1.7 17H0l1.7-17h7.8C11 1.9 12.4 0 14 0s3 1.9 4.5 6.7h7.8zM14 1.7c-.3 0-1.2.4-2.7 5h5.5c-1.6-4.5-2.5-5-2.8-5zM2.4 21.6h23.2L24.3 8.8h-5.2c.3 1 .6 2.1.9 3.3l-1.7.4c-.3-1.3-.7-2.5-1-3.7h-6.8c-.4 1.2-.7 2.5-1 3.7l-1.7-.4c.3-1.2.6-2.3.9-3.3H3.6L2.4 21.6z"/></svg>
            <span class="ton-cart-count" v-if="store.carNum > 0">{{ store.carNum > 99 ? '99+' : store.carNum }}</span>
          </div>
        </div>
      </div>

      <nav class="ton-category-nav desktop-only">
        <div class="ton-category-nav-inner">
          <a href="/searchgoods" class="ton-category-link">JUST IN</a>
          <a href="/searchgoods" class="ton-category-link">DESIGNERS</a>
          <a href="/searchgoods" class="ton-category-link">CLOTHING</a>
          <a href="/searchgoods" class="ton-category-link">SHOES</a>
          <a href="/searchgoods" class="ton-category-link">BAGS</a>
          <a href="/searchgoods" class="ton-category-link">ACCESSORIES</a>
          <a href="/miaoshalist" class="ton-category-link ton-category-sale">SALE</a>
        </div>
      </nav>
    </header>

    <div class="ton-mobile-drawer-overlay" :class="{ open: mobileMenuOpen }" @click="mobileMenuOpen = false"></div>
    <div class="ton-mobile-drawer" :class="{ open: mobileMenuOpen }">
      <div class="ton-drawer-header">
        <span v-if="store.isLogin">{{ store.userInfo.username }}</span>
        <span v-else @click="$router.push('/login'); mobileMenuOpen = false">Log in / Register</span>
        <button @click="mobileMenuOpen = false">&times;</button>
      </div>
      <div class="ton-drawer-search">
        <input v-model="keyword" type="text" placeholder="Search..." @keyup.enter="searchMobile" />
      </div>
      <div class="ton-drawer-items">
        <div class="ton-drawer-item" @click="goMobile('/main')">Home</div>
        <div class="ton-drawer-item" @click="goMobile('/tuijianlist')">Recommended</div>
        <div class="ton-drawer-item" @click="goMobile('/remenglist')">Popular</div>
        <div class="ton-drawer-item" @click="goMobile('/myorder')">My Orders</div>
        <div class="ton-drawer-item" @click="goMobile('/car')">Cart ({{ store.carNum }})</div>
        <div class="ton-drawer-item" @click="goMobile('/myaccount')">My Account</div>
        <div class="ton-drawer-divider"></div>
        <div class="ton-drawer-item" v-if="store.isLogin" @click="handleLogoutMobile">Logout</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'

const router = useRouter()
const store = useAppStore()
const keyword = ref('')
const mobileMenuOpen = ref(false)

const langNames = { 'en': 'English', 'zh-CN': '简体中文', 'de': 'Deutsch', 'fr': 'Français', 'ja': '日本語', 'es': 'español', 'vi': 'Tiếng Việt' }
const currentLangName = computed(() => langNames[store.lang] || 'English')

const goMobile = (path) => { mobileMenuOpen.value = false; router.push(path) }
const searchMobile = () => {
  if (keyword.value.trim()) { mobileMenuOpen.value = false; router.push('/searchgoods?keyword=' + encodeURIComponent(keyword.value.trim())) }
}
const handleLogout = () => { store.logout(); router.push('/login'); ElMessage.success('Logged out') }
const handleLogoutMobile = () => { mobileMenuOpen.value = false; store.logout(); router.push('/login'); ElMessage.success('Logged out') }
</script>

<style scoped>
.ton-header { width: 100%; position: sticky; top: 0; z-index: 1000; }

/* ── Info Bar ── */
.ton-info-bar { width: 100%; }
.ton-info-bar-wrapper { width: 100vw; position: relative; background: #f2f2f2; }
.ton-info-bar-courtesy { display: none; }
@media (min-width: 1024px) {
  .ton-info-bar-courtesy { display: flex; align-items: center; justify-content: space-between; font: 14px/1.375 TheOutnetWebXL, Arial; max-width: 1440px; margin: 0 auto; background: #f2f2f2; }
}
.ton-info-bar-left { display: flex; align-items: center; padding-left: 32px; }
.ton-info-bar-signin, .ton-info-bar-user { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px 16px 8px 0; border-right: 1px solid #d3d3d3; margin: 8px 16px 8px 0; }
.ton-info-bar-signin:hover, .ton-info-bar-user:hover, .ton-info-bar-right a:hover { text-decoration: underline; }
.ton-icon-person { display: inline-block; width: 18px; height: 20px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='20'%3E%3Cg fill-rule='evenodd'%3E%3Cpath d='M10.616 10.549A7.111 7.111 0 0012.15 9C15.563 10.517 18 14.428 18 19.002V20H0v-.998c0-4.514 2.373-8.382 5.717-9.94a6.03 6.03 0 001.389 1.574c-2.737.931-4.812 3.83-5.145 7.368H16.04c-.344-3.657-2.55-6.63-5.423-7.455z'/%3E%3Cpath d='M9.5 2c-.922 0-1.844.415-2.53 1.138-.713.751-1.06 1.74-.95 2.71.17 1.664 1.137 2.946 1.985 3.594.598.456 1.105.583 1.38.554.912-.122 3.34-1.732 3.594-4.141l.001-.007c.11-.97-.237-1.959-.95-2.71C11.344 2.415 10.422 2 9.5 2m-.19 10c-.836 0-1.725-.347-2.559-.993-1.508-1.173-2.526-3.03-2.72-4.967-.17-1.521.36-3.072 1.452-4.243C6.548.656 8.012 0 9.5 0c1.488 0 2.952.656 4.018 1.797 1.092 1.171 1.62 2.72 1.451 4.25-.337 3.222-3.38 5.666-5.329 5.934a2.772 2.772 0 01-.33.019'/%3E%3C/g%3E%3C/svg%3E") no-repeat center; background-size: contain; }
.ton-signin-text { font-size: 14px; color: #000; }
.ton-info-bar-locale { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
.ton-flag-placeholder { font-size: 14px; }
.ton-locale-text { font-size: 14px; color: #000; }
.ton-info-bar-right { max-width: 1440px; padding: 0 32px; text-align: right; }
.ton-info-bar-right a { display: inline-block; font-size: 14px; color: #000; cursor: pointer; border-right: 1px solid #d3d3d3; margin: 8px 8px 8px 0; padding-right: 8px; }
.ton-info-bar-right a:last-child { border-right: none; }
.ton-info-bar-right a:hover { text-decoration: underline; }
.ton-info-bar-locale { padding-left: 8px; border-left: 1px solid #d3d3d3; margin: 8px 0; }

/* ── Promo Bar ── */
.ton-promo-bar { background: #000; color: #fff; font: 12px/1.375 TheOutnetWebXL, Arial; letter-spacing: 1px; display: flex; align-items: center; min-height: 38px; width: 100vw; position: relative; left: calc(-50vw + 50%); }
@media (min-width: 1024px) { .ton-promo-bar { font: 14px/1.375 TheOutnetWebXL, Arial; } }
.ton-promo-bar-container { max-width: 1440px; margin: 0 auto; text-align: center; padding: 8px 16px; }
@media (min-width: 1024px) { .ton-promo-bar-container { padding: 16px 32px; } }
.ton-promo-link { color: #fff; text-decoration: underline; margin-left: 8px; cursor: pointer; }

/* ── Main Header ── */
.ton-header-main { background: #fff; border-bottom: 1px solid #e6e6e6; }
@media (min-width: 1024px) { .ton-header-main { margin: 0 32px; } }
.ton-header-container { display: flex; justify-content: space-between; align-items: center; height: 60px; max-width: 1440px; position: relative; padding: 0 16px; }
@media (min-width: 768px) { .ton-header-container { padding: 0 32px; } }
@media (min-width: 1024px) { .ton-header-container { margin: 0 auto; padding: 0 32px; } }

.ton-hamburger { display: flex; align-items: center; background: none; border: none; cursor: pointer; color: #000; padding: 0; margin-right: auto; }
@media (min-width: 1024px) { .ton-hamburger { display: none; } }

/* Gender Switch */
.ton-gender-switch { display: none; align-items: center; gap: 0; margin-right: auto; font-family: TheOutnetWebXL, Arial; font-size: 24px; }
@media (min-width: 1024px) { .ton-gender-switch { display: flex; } }
.ton-gender-active { color: #000; }
.ton-gender-link { color: #b7b7b7; cursor: pointer; }
.ton-gender-divider { width: 1px; height: 20px; background: #e6e6e6; margin: 0 20px; }
/* Logo - absolutely centered */
.ton-logo { justify-content: center; position: absolute; left: 50%; transform: translateX(-50%); display: block; height: 13px; width: 148px; background: url('@/assets/images/ton-logo.svg') no-repeat center; background-size: contain; cursor: pointer; }
@media (min-width: 768px) { .ton-logo { height: 20px; width: 205px; } }
@media (min-width: 1024px) { .ton-logo { height: 24px; width: 276px; } }

.ton-account-mobile { display: flex; align-items: center; cursor: pointer; color: #000; padding: 6px; }
@media (min-width: 1024px) { .ton-account-mobile { display: none; } }

.ton-header-icons { display: flex; align-items: center; order: 5; }

.ton-search { display: flex; align-items: center; cursor: pointer; gap: 8px; border-right: 1px solid #e6e6e6; margin-right: 16px; padding-right: 16px; color: #000; }
.ton-search:hover > span { color: #000; }
.ton-search svg { fill: #b7b7b7; }
.ton-search-text { font: 14px/1.375 TheOutnetWebXL, Arial; color: #b7b7b7; display: inline-block; vertical-align: top; }

.ton-wishlist { display: none; cursor: pointer; margin-right: 24px; color: #000; }
.ton-wishlist svg { fill: #000; }
@media (min-width: 1024px) { .ton-wishlist { display: block; } }

.ton-cart { position: relative; cursor: pointer; color: #000; display: flex; align-items: center; }
.ton-cart svg { fill: #000; }
.ton-cart-count { font: 12px/1.375 TheOutnetWebXL, Arial; letter-spacing: 1px; font-weight: 700; position: absolute; width: 22px; height: 22px; color: #fff; z-index: 0; padding: 2px; text-align: center; background: #000; border-radius: 50%; border: 1px solid #fff; transform: translate(-14px, -8px); display: flex; align-items: center; justify-content: center; font-size: 10px; }

/* ── Category Nav ── */
.ton-category-nav { display: none; }
@media (min-width: 1024px) {
  .ton-category-nav { display: block; }
  .ton-category-nav-inner { display: flex; justify-content: center; max-width: 985px; margin: 0 auto; padding-bottom: 10px; }
  .ton-category-nav:hover { color: #b7b7b7; }
  .ton-category-link { font: 16px/1.375 TheOutnetWebXL, Arial; color: inherit; text-decoration: none; padding: 17px 0 15px; text-align: center; flex: 1; cursor: pointer; transition: color 0.3s; }
  .ton-category-link:hover { color: #000; }
  .ton-category-sale { color: #b90000; }
}

/* ── Mobile Drawer ── */
.ton-mobile-drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 998; display: none; }
.ton-mobile-drawer-overlay.open { display: block; }
.ton-mobile-drawer { position: fixed; top: 0; left: -280px; width: 280px; height: 100%; background: #fff; z-index: 999; transition: left 0.3s ease; overflow-y: auto; }
.ton-mobile-drawer.open { left: 0; }
.ton-drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #e6e6e6; font-weight: 600; font-size: 14px; }
.ton-drawer-header button { font-size: 24px; background: none; border: none; cursor: pointer; }
.ton-drawer-search { padding: 12px 16px; border-bottom: 1px solid #e6e6e6; }
.ton-drawer-search input { width: 100%; height: 36px; padding: 0 12px; border: 1px solid #e6e6e6; font-size: 14px; }
.ton-drawer-items { padding: 4px 0; }
.ton-drawer-item { padding: 12px 16px; cursor: pointer; font-size: 14px; color: #000; }
.ton-drawer-item:hover { background: #f4f2ee; }
.ton-drawer-divider { height: 1px; background: #e6e6e6; margin: 4px 16px; }

@media (max-width: 1023px) {
  .desktop-only { display: none !important; }
}
@media (min-width: 1024px) {
  .mobile-only { display: none !important; }
}
</style>
