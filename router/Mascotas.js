const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {
    try {
        const arrayMascotas = await Mascota.find();
        console.log(arrayMascotas)
        res.render("mascotas", {
            arrayMascotas
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()

        //await Mascota.create(body) tambien sirve

        res.redirect('/mascotas')

    } catch(error) {
        console.log(error)
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findOne({_id: id})
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
        res.render('detalle', {
            error: true,
            mensaje: "No se encontra la mascota"
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id:id})

        if (!mascotaDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Mascota eliminada'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body

    try {
        const mascotaDB = await Mascota.findOneAndUpdate(
            id, body, { useFindAndModify: false } 
        )

        res.json({
            estado: true,
            mensaje: 'Mascota editada'
        })


    } catch(error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Error al editar mascota'
        })
    }
})

module.exports = router;