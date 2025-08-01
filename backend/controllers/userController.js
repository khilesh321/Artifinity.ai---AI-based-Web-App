
import Creation from '../models/creation.js';

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const creations = await Creation.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, creations });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message || 'An error occurred while fetching user creations.' });
  }
}

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await Creation.find({ publish: true }).sort({ createdAt: -1 });
    res.json({ success: true, creations });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message || 'An error occurred while fetching user creations.' });
  }
}

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { creationId } = req.body;

    const creation = await Creation.findOne({ id: creationId });
    if (!creation) {
      return res.status(404).json({ success: false, message: 'Creation not found.' });
    }

    const currentLikes = Array.isArray(creation.likes) ? creation.likes : [];
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter(user => user !== userIdStr);
      message = 'Creation unliked successfully.';
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = 'Creation liked successfully.';
    }

    await Creation.updateOne(
      { id: creationId },
      { $set: { likes: updatedLikes } }
    );

    res.json({ success: true, message });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message || 'An error occurred while fetching user creations.' });
  }
}