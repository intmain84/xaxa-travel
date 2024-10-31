import { supabaseUrl } from '../services/supabase.js'

// CREATING IMAGE PATHS
function createImagesData(images) {
    let imagesData = []
    Array.from(images).forEach((file) => {
        const name = `${Math.random()}-${file.name.replace(/[\/ _]/g, '')}`
        imagesData.push({
            imageName: name,
            path: `${supabaseUrl}/storage/v1/object/public/locations/${name}`,
            file,
        })
    })

    return imagesData
}

export default createImagesData
