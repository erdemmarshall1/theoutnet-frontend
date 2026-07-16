<template>
  <div>
    <h3 style="margin-bottom:20px">Theme Settings</h3>

    <el-form label-position="top" style="max-width:600px">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Colors" name="colors">
          <div class="color-grid">
            <div v-for="c in colorFields" :key="c.key" class="color-item">
              <label>{{ c.label }}</label>
              <div class="color-input-row">
                <input type="color" :value="form[c.key]" @input="form[c.key] = $event.target.value" class="color-picker" />
                <el-input v-model="form[c.key]" size="small" style="width:130px" />
                <button class="color-reset" @click="form[c.key] = c.default" title="Reset to default">↺</button>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Branding" name="branding">
          <el-form-item label="Site Name">
            <el-input v-model="form.siteName" size="large" />
          </el-form-item>
          <el-form-item label="Font Family">
            <el-input v-model="form.fontFamily" size="large" placeholder="TheOutnetWebXL, Arial" />
          </el-form-item>
          <el-form-item label="Logo URL">
            <el-input v-model="form.logoUrl" size="large" placeholder="https://..." />
          </el-form-item>
          <el-form-item label="Favicon URL">
            <el-input v-model="form.faviconUrl" size="large" placeholder="https://..." />
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="Custom CSS" name="css">
          <el-form-item label="Custom CSS Overrides">
            <el-input v-model="form.customCSS" type="textarea" :rows="8" placeholder="/* Add custom CSS here */" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <div style="margin-top:20px;display:flex;gap:8px">
        <el-button type="primary" size="large" style="background:#000;border-color:#000" :loading="saving" @click="handleSave">Save Settings</el-button>
        <el-button size="large" @click="handlePreview">Preview</el-button>
      </div>

      <div v-if="previewVisible" class="preview-panel" :style="previewStyle">
        <h4>Preview</h4>
        <p style="margin:8px 0">This is how your theme will look on the website.</p>
        <div class="preview-buttons">
          <button style="background:#000;color:#fff;border:none;padding:8px 16px;border-radius:4px">Button</button>
          <button style="border:1px solid #e6e6e6;padding:8px 16px;border-radius:4px;background:#fff">Outline</button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { post, get, qe } from '@/api/request'

const activeTab = ref('colors')
const saving = ref(false)
const previewVisible = ref(false)

const colorFields = [
  { key: 'primaryColor', label: 'Primary', default: '#000000' },
  { key: 'backgroundColor', label: 'Background', default: '#ffffff' },
  { key: 'textColor', label: 'Text', default: '#000000' },
  { key: 'accentColor', label: 'Accent', default: '#b8922a' },
  { key: 'borderColor', label: 'Border', default: '#e6e6e6' },
]

const form = reactive({
  siteName: 'THE OUTNET WHOLESALE',
  fontFamily: 'TheOutnetWebXL, Arial',
  primaryColor: '#000000',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  accentColor: '#b8922a',
  borderColor: '#e6e6e6',
  logoUrl: '',
  faviconUrl: '',
  customCSS: '',
})

const previewStyle = computed(() => ({
  background: form.backgroundColor,
  color: form.textColor,
  borderColor: form.borderColor,
  border: `1px solid ${form.borderColor}`,
  '--accent': form.accentColor,
}))

onMounted(async () => {
  const res = await qe(get('/home/admin/settings/theme'))
  if (res && res.data) {
    Object.keys(form).forEach(k => { if (res.data[k] !== undefined) form[k] = res.data[k] })
  }
})

const handleSave = async () => {
  saving.value = true
  const res = await qe(post('/home/admin/settings/theme', { ...form }))
  saving.value = false
  if (res) ElMessage.success('Theme settings saved')
}

const handlePreview = () => { previewVisible.value = !previewVisible.value }
</script>

<style scoped>
.color-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
.color-item label { display:block;font-size:12px;color:#666;margin-bottom:4px; }
.color-input-row { display:flex;align-items:center;gap:6px; }
.color-picker { width:36px;height:36px;border:1px solid #e6e6e6;border-radius:4px;cursor:pointer;padding:0; }
.color-reset { background:none;border:none;cursor:pointer;font-size:16px;color:#999;padding:4px; }
.color-reset:hover { color:#000; }
.preview-panel { margin-top:16px;padding:20px;border-radius:8px; }
.preview-buttons { display:flex;gap:8px;margin-top:12px; }
</style>
