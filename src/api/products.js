import { Router } from 'express';
import { productosDao } from '../daos/index.js';

export const apiProducts = Router();

apiProducts.get('/', async (req, res) => {
  if (!req.session.passport?.user) {
    res.render('pages/login.ejs');
  } else {
    const products = await productosDao.getAll();
    res.send(products);
  }
});

apiProducts.get('/:id', async (req, res) => {
  if (!req.session.passport?.user) {
    res.render('pages/login.ejs');
  } else {
    const id = req.params.id;
    const product = await productosDao.getById(id);
    res.send(product);
  }
});

apiProducts.post('/', async (req, res) => {
  if (!req.session.passport?.user) {
    res.render('pages/login.ejs');
  } else {
    const product = req.body;
    const savedProduct = await productosDao.save(product);
    res.send(savedProduct);
  }
});

apiProducts.put('/:id', async (req, res) => {
  if (!req.session.passport?.user) {
    res.render('pages/login.ejs');
  } else {
    const idProductUpdate = req.params.id;
    const productUpdate = req.body;
    const updatedProduct = await productosDao.update(
      idProductUpdate,
      productUpdate
    );
    res.send(updatedProduct);
  }
});

apiProducts.delete('/:id', async (req, res) => {
  if (!req.session.passport?.user) {
    res.render('pages/login.ejs');
  } else {
    const id = req.params.id;
    await productosDao.deleteById(id);
    res.send({ message: 'Producto eliminado correctamente' });
  }
});
