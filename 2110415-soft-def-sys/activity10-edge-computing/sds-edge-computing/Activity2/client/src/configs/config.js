const config = {
    edgeUrl: import.meta.env.VITE_EDGE_URL || '',
    hybridUrl: import.meta.env.VITE_HYBRID_URL || '',
    cloudRegion: import.meta.env.VITE_CLOUD_REGION || '',
    cloudAccessKeyID: import.meta.env.VITE_ACCESS_KEY_ID || '',
    cloudSecretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY || '',
    cloudEndpointName: import.meta.env.VITE_ENDPOINT_NAME || '',
}

// console.log('===========')
// console.log(config)
// console.log('===========')

export default config
