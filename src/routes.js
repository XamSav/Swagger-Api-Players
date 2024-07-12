const express = require('express');
const router = express.Router();
const fs = require('fs'); 
const bodyParser = require("body-parser");
const path = require('path');
// Datos de jugadores simulados
var players = [
    { id: "1", position: "1", alias: "xamsav", password: "a9993e364706816aba3e25717850c26c9cd0d89d", score: 1000, created: "2024-06-03T15:20:21.377Z", avatar: 0 },
    { id: "2", position: "2", alias: "pepe", password: "40bd001563085fc35165329ea1ff5c5ecbdbbeef", score: 950, created: "2024-06-03T15:20:21.377Z", avatar: 0 },
    { id: "3", position: "3", alias: "pedro", password: "40bd001563085fc35165329ea1ff5c5ecbdbbeef", score: 850, created: "2024-06-03T15:20:21.377Z", avatar: 0 }
];

function savejson(){
    const str = JSON.stringify(players);
    fs.writeFileSync('./src/player.json', str,'utf8');
}
function getjson() {
    const filePath = path.resolve(__dirname, './player.json');

    try {
        // Intentar leer el archivo JSON
        const data = fs.readFileSync(filePath, 'utf8');
        players = JSON.parse(data);
    } catch (err) {
        
        if (err.code === 'ENOENT') {
            // Si el archivo no existe, crearlo con un array vacío de players
            const initialData = JSON.stringify(players);
            fs.writeFileSync(filePath, initialData);
            players = [];  // Inicializar players como un array vacío
        } else {
            // Manejar otros errores de lectura del archivo
            console.error('Error al leer el archivo:', err.message);
            throw err;
        }
    }
}
getjson();
/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - id
 *         - position
 *         - alias
 *         - password
 *         - score
 *         - created
 *         - avatar
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-generado del jugador
 *         position:
 *           type: string
 *           description: Posición del jugador
 *         alias:
 *           type: string
 *           description: Alias del jugador
 *         password:
 *           type: string
 *           description: Contraseña del jugador
 *         score:
 *           type: integer
 *           description: Puntuación del jugador
 *         created:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del jugador
 *         avatar:
 *           type: integer
 *           description: Avatar del jugador
 *       example:
 *         id: "1"
 *         position: "1"
 *         alias: "xamsav"
 *         password: "a9993e364706816aba3e25717850c26c9cd0d89d"
 *         score: 1000
 *         created: "2024-06-03T15:20:21.377Z"
 *         avatar: 0
 */

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API para administrar jugadores ficticios
 */

/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Error del servidor
 */
router.get('/players', (req, res) => {
    res.json(players);
});

/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Crear un nuevo jugador
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Jugador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       500:
 *         description: Error del servidor
 */
router.post('/players', (req, res) => {
    const player = req.body;
    player.id = (players.length + 1).toString();  // Generar un nuevo id para el jugador
    players.push(player);
    savejson();
    res.status(201).json(player);
});

/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Actualizar un jugador por su id
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Jugador actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/players/:id', (req, res) => {
    const { id } = req.params;
    const updatedPlayer = req.body;

    let player = players.find(p => p.id === id);

    if (player) {
        player.position = updatedPlayer.position;
        player.alias = updatedPlayer.alias;
        player.password = updatedPlayer.password;
        player.score = updatedPlayer.score;
        player.created = updatedPlayer.created;
        player.avatar = updatedPlayer.avatar;
        savejson();
        res.json(player);
    } else {
        res.status(404).send({ message: 'Jugador no encontrado' });
    }
});

/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Eliminar un jugador por su id
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del jugador
 *     responses:
 *       200:
 *         description: Jugador eliminado
 *       404:
 *         description: Jugador no encontrado
 */
router.delete('/players/:id', (req, res) => {
    const { id } = req.params;
    const index = players.findIndex(p => p.id === id);

    if (index !== -1) {
        players.splice(index, 1);
        savejson();
        res.status(200).send({ message: 'Jugador eliminado' });
    } else {
        res.status(404).send({ message: 'Jugador no encontrado' });
    }
});

module.exports = router;
