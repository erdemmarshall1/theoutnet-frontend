<template>
  <div>
    <h3>Change Password</h3>
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top" style="max-width:500px;margin-top:20px">
      <el-form-item label="Current Password" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" show-password placeholder="Enter current password" size="large" />
      </el-form-item>
      <el-form-item label="New Password" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" show-password placeholder="Enter new password" size="large" />
      </el-form-item>
      <el-form-item label="Confirm New Password" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" show-password placeholder="Confirm new password" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" style="background:#000;border-color:#000" :loading="loading" @click="handleChange">Update Password</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { post, qe } from '@/api/request'

const formRef = ref(null)
const loading = ref(false)
const form = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const rules = {
  oldPassword: [{ required: true, message: 'Please enter current password', trigger: 'blur' }],
  newPassword: [{ required: true, message: 'Please enter new password', trigger: 'blur' }, { min: 6, message: 'At least 6 characters', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: 'Please confirm new password', trigger: 'blur' },
    { validator: (rule, value, callback) => { if (value !== form.newPassword) callback(new Error('Passwords do not match')); else callback(); }, trigger: 'blur' },
  ],
}

const handleChange = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  const res = await qe(post('/home/user/editPassword', { oldPassword: form.oldPassword, newPassword: form.newPassword }))
  loading.value = false
  if (res) {
    ElMessage.success('Password updated successfully')
    form.oldPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
  }
}
</script>
