import Collection from "../models/collection.schema.js";
import CustomError from "../utils/customError.js";

//create collection

export const createCollection = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new CustomError("Collection name is required", 400);
    }

    const collection = await Collection.create({
      name,
    });

    res.status(200).json({
      success: true,
      message: "Collection created Successfully",
      collection,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Update collection

export const updateCollection = async (req, res) => {
  try {
    const { id: collectionId } = req.params;
    const { name } = req.body;

    if (!name) {
      throw new CustomError("Collection name is required", 400);
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
      collectionId,
      {
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCollection) {
      throw new CustomError("Collection not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Collection Updated Successfully",
      updatedCollection,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Get All Collection
export const readCollection = async (req, res) => {
  try {
    const collections = await Collection.find();
    if (!collections) {
      throw new CustomError("Collections is not found", 400);
    }

    res.status(200).json({
      sucess: true,
      collections,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Delete Collection
export const deleteCollection = async (req, res) => {
  try {
    const { id: collectionId } = req.params;

    const collectionToDelete = await Collection.findById(collectionId);

    if (!collectionToDelete) {
      throw new CustomError("Collection not found", 404);
    }

    collectionToDelete.remove();

    res.status(200).json({
      sucess: true,
      message: "collection is deleted",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};
