'use strict'

require('dotenv').config()
const GhostAdminAPI = require('@mikemimik/ghost-admin-api')
const FormData = require('form-data')
const fetch = require('node-fetch')
const path = require('path')
const fs = require('fs')

const pkg = require('../package.json')

const { SITE_URL, SITE_API_KEY } = process.env

const api = new GhostAdminAPI({
  url: SITE_URL,
  key: SITE_API_KEY,
  version: 'v3'
})

const endpoint = `${SITE_URL}/ghost/api/v3/admin/themes/${pkg.name}/activate`
const location = path.join(__dirname, '..', 'dist', `${pkg.name}.zip`)
const form = new FormData({ file: location })

async function main () {
  console.log('Beginning deploy...⏱')
  try {
    console.log('Uploading theme...📦 ⏩')
    const uploadResponse = await api.themes.upload(form)
    console.log('Upload successful...📦 ✅')
  } catch (err) {
    console.error(err)
    throw new Error('Theme Upload Failed')
  }

  try {
    console.log('Activating theme...🔛 🟢')
    const activateResponse = await api.themes.activate(pkg.name)

  } catch (err) {
    console.error(err)
    throw new Error('Failed to Activate Theme')
  }
  console.log('Deployment completed! ✅ 🙌🏽')
}

main()