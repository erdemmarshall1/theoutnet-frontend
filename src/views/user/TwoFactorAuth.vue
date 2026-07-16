<template>
  <div>
    <h3>Two-Factor Authentication</h3>
    <p style="color:#666;margin:8px 0 20px">Add an extra layer of security to your account using an authenticator app.</p>

    <div v-if="loading" style="text-align:center;padding:40px">Loading...</div>

    <template v-else-if="!setupMode">
      <el-alert v-if="twoFactorEnabled" type="success" title="2FA is enabled" description="Your account is protected by two-factor authentication." show-icon style="margin-bottom:16px" closable />
      <el-alert v-else type="warning" title="2FA is disabled" description="Enable two-factor authentication to secure your account." show-icon style="margin-bottom:16px" closable />

      <el-button v-if="!twoFactorEnabled" type="primary" style="background:#000;border-color:#000" @click="startSetup">Enable 2FA</el-button>

      <template v-if="twoFactorEnabled">
        <div style="margin-top:20px">
          <h4 style="margin-bottom:12px">Backup Codes</h4>
          <p style="color:#666;font-size:13px;margin-bottom:12px">Each backup code can be used once. Generate new codes if you run out.</p>
          <el-button size="small" style="background:#000;border-color:#000;color:#fff" @click="generateBackupCodes">Generate New Codes</el-button>
        </div>

        <div style="margin-top:24px;border-top:1px solid #eee;padding-top:20px">
          <h4 style="margin-bottom:12px">Disable 2FA</h4>
          <el-form :model="disableForm" label-position="top" style="max-width:400px">
            <el-form-item label="Enter your password to disable">
              <el-input v-model="disableForm.password" type="password" show-password placeholder="Current password" size="large" />
            </el-form-item>
            <el-button type="danger" :loading="disabling" @click="handleDisable">Disable 2FA</el-button>
          </el-form>
        </div>
      </template>
    </template>

    <template v-else>
      <div style="max-width:500px">
        <h4 style="margin-bottom:12px">Scan QR Code</h4>
        <p style="color:#666;font-size:13px;margin-bottom:16px">Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)</p>
        <div style="background:#f5f5f5;padding:20px;border-radius:8px;display:inline-block;margin-bottom:16px">
          <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="2FA QR Code" style="width:180px;height:180px" />
        </div>
        <p style="font-size:12px;color:#999;margin-bottom:16px">Or enter this key manually: <code style="background:#f0f0f0;padding:2px 6px;border-radius:3px;word-break:break-all">{{ secretKey }}</code></p>

        <el-form :model="verifyForm" label-position="top" style="max-width:400px">
          <el-form-item label="Verification Code">
            <el-input v-model="verifyForm.token" placeholder="Enter 6-digit code from app" size="large" maxlength="6" />
          </el-form-item>
          <div style="display:flex;gap:8px">
            <el-button type="primary" style="background:#000;border-color:#000" :loading="verifying" @click="handleVerify">Verify & Enable</el-button>
            <el-button @click="cancelSetup">Cancel</el-button>
          </div>
        </el-form>

        <div v-if="backupCodes.length" style="margin-top:20px;padding:16px;background:#faf8f4;border-radius:8px;border:1px solid #e8e6e2">
          <h4 style="margin-bottom:8px">Backup Codes</h4>
          <p style="color:#b90000;font-size:12px;margin-bottom:8px">Save these codes in a safe place! Each can be used once to log in if you lose access to your authenticator app.</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-family:monospace;font-size:14px">
            <div v-for="(code, i) in backupCodes" :key="i" style="background:#fff;padding:6px 12px;border-radius:4px;border:1px solid #e8e6e2">{{ code }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { post, get, qe } from '@/api/request'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const loading = ref(true)
const twoFactorEnabled = ref(false)
const setupMode = ref(false)
const qrCodeUrl = ref('')
const secretKey = ref('')
const backupCodes = ref([])
const verifying = ref(false)
const disabling = ref(false)

const disableForm = ref({ password: '' })
const verifyForm = ref({ token: '' })

onMounted(async () => {
  twoFactorEnabled.value = store.userInfo?.twoFactorEnabled || false
  loading.value = false
})

const startSetup = async () => {
  const res = await qe(post('/home/user/2fa/setup'))
  if (res && res.data) {
    qrCodeUrl.value = res.data.qrCodeUrl
    secretKey.value = res.data.secret
    setupMode.value = true
  }
}

const handleVerify = async () => {
  if (!verifyForm.value.token) {
    ElMessage.warning('Please enter the verification code')
    return
  }
  verifying.value = true
  const res = await qe(post('/home/user/2fa/verify', { token: verifyForm.value.token }))
  verifying.value = false
  if (res && res.data) {
    ElMessage.success('2FA enabled successfully')
    backupCodes.value = res.data.backupCodes || []
    twoFactorEnabled.value = true
    setupMode.value = false
  }
}

const handleDisable = async () => {
  if (!disableForm.value.password) {
    ElMessage.warning('Please enter your password')
    return
  }
  disabling.value = true
  const res = await qe(post('/home/user/2fa/disable', { password: disableForm.value.password }))
  disabling.value = false
  if (res) {
    ElMessage.success('2FA disabled')
    twoFactorEnabled.value = false
    disableForm.value.password = ''
  }
}

const generateBackupCodes = async () => {
  const res = await qe(post('/home/user/2fa/backup-codes'))
  if (res && res.data) {
    backupCodes.value = res.data.backupCodes || []
    ElMessage.success('New backup codes generated')
  }
}

const cancelSetup = () => {
  setupMode.value = false
  verifyForm.value.token = ''
}
</script>
