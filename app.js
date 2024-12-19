// Importation des modules nécessaires
const express = require('express');
const app = express();
const port = 3000;

// Middleware pour analyser les données JSON
app.use(express.json());

// "Base de données" en mémoire
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Route: GET pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  res.json(users);
});

// Route: GET pour récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  res.json(user);
});

// Route: POST pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route: PUT pour mettre à jour un utilisateur existant
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  if (!name || !email) {
    return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
  }

  user.name = name;
  user.email = email;

  res.json(user);
});

// Route: DELETE pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  users.splice(userIndex, 1);
  res.status(204).send(); // Pas de contenu à retourner
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
