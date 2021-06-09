const express = require('express');
const router = express.Router();

const Pedido = require('../models/pedido')

router.get('/', async (req, res) => {
    try {
        const arrayPedidos = await Pedido.find();
        console.log(arrayPedidos)
        res.render("pedidos", {
            arrayPedidos
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
        const pedidoDB = new Pedido(body)
        await pedidoDB.save()

        res.redirect('/pedidos')

    } catch(error) {
        console.log(error)
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const pedidoDB = await Pedido.findOne({_id: id})
        res.render('detalle', {
            pedido: pedidoDB,
            error: false
        })
    } catch (error) {
        res.render('detalle', {
            error: true,
            mensaje: "No se encontra el pedido"
        })
    }
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id
    
    try {
        const pedidoDB = await Pedido.findByIdAndDelete({_id:id})

        if (!pedidoDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Pedido eliminado'
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
        const pedidoDB = await Mascota.findOneAndUpdate(
            id, body, { useFindAndModify: false } 
        )

        res.json({
            estado: true,
            mensaje: 'Pedido editada'
        })


    } catch(error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Error al editar el pedido'
        })
    }
})

module.exports = router