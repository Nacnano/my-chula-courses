import axios from 'axios'
import config from '../configs/config'
import {
    SageMakerRuntimeClient,
    InvokeEndpointCommand,
} from '@aws-sdk/client-sagemaker-runtime'

//Edge API
const edgeApi = axios.create({
    baseURL: `${config.edgeUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})
edgeApi.interceptors.request.use((x) => {
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime()
    return x
})
edgeApi.interceptors.response.use(
    (x) => {
        x.responseTime = new Date().getTime() - x.config.meta.requestStartedAt
        return x
    },
    (err) => {
        throw err
    }
)

//Cloud API
const client = new SageMakerRuntimeClient({
    region: config.cloudRegion,
    credentials: {
        accessKeyId: config.cloudAccessKeyID,
        secretAccessKey: config.cloudSecretAccessKey,
    },
})
const InvokeEndpoint = (base64Image) => {
    const params = {
        EndpointName: config.cloudEndpointName,
        'Content-Type': 'application/json',
        Body: base64Image,
    }

    return new Promise(async (resolve, reject) => {
        const requestStartedAt = new Date().getTime()
        try {
            const command = new InvokeEndpointCommand(params)
            const response = await client.send(command)
            const responseTime = new Date().getTime() - requestStartedAt
            const responseData = await new Response(response.Body).json()
            resolve({ data: responseData.data, responseTime })
        } catch (error) {
            console.error('Error invoking endpoint:', error)
            reject(error)
        }
    })
}

// Hybrid API
const hybridApi = axios.create({
    baseURL: `${config.hybridUrl}/`,
    headers: {
        'Content-Type': 'application/json',
    },
})
hybridApi.interceptors.request.use((x) => {
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime()
    return x
})
hybridApi.interceptors.response.use(
    (x) => {
        x.responseTime = new Date().getTime() - x.config.meta.requestStartedAt
        return x
    },
    (err) => {
        throw err
    }
)
const queryService = {
    edgePeopleCounting(base64Image) {
        return edgeApi.post(`/predict`, {
            image: base64Image,
        })
    },
    cloudPeopleCounting(base64Image, modelSize = '') {
        // MockTest;
        // return new Promise((resolve, reject) => {
        //     setTimeout(
        //         () =>
        //             resolve({
        //                 data: { building: 'A', floor: '1', tag: '21' },
        //                 responseTime: 235.5,
        //             }),
        //         1000
        //     )
        // })
        return InvokeEndpoint(base64Image)
    },
    hybridPeopleCounting(base64Image) {
        return hybridApi.post(`/predict`, {
            image: base64Image,
        })
    },
}
export default queryService
