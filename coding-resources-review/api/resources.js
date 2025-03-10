const express = require('express');
const { getAllResources, getResourceById, createResource, updateResource, deleteResource } = require('../db');
const { requireUser } = require('./utils');

const resourcesRouter = express.Router();

// Get all resources
resourcesRouter.get('/', async (req, res, next) => {
  try {
    const resources = await getAllResources();
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

// Get a resource by ID
resourcesRouter.get('/:id', async (req, res, next) => {
  try {
    const resource = await getResourceById(req.params.id);
    res.json(resource);
  } catch (error) {
    next(error);
  }
});

// Create a new resource (requires authentication)
resourcesRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const resource = await createResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
});

// Update a resource (requires authentication)
resourcesRouter.patch('/:id', requireUser, async (req, res, next) => {
  try {
    const resource = await updateResource(req.params.id, req.body);
    res.json(resource);
  } catch (error) {
    next(error);
  }
});

// Delete a resource (requires authentication)
resourcesRouter.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const resource = await deleteResource(req.params.id);
    res.json(resource);
  } catch (error) {
    next(error);
  }
});

module.exports = resourcesRouter;