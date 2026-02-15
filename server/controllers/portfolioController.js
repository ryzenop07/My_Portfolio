const Portfolio = require('../models/Portfolio');

exports.getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      portfolio = await Portfolio.create({
        name: 'Vishal Prajapati',
        title: 'Full-Stack Developer',
        bio: 'Computer Science undergraduate specializing in Full-Stack Web Development.',
        email: 'prajapativishal273212@gmail.com',
        phone: '+91 9219057144',
        location: 'Gorakhpur, UP, India',
        socialLinks: {}
      });
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      portfolio = await Portfolio.create(req.body);
    } else {
      portfolio = await Portfolio.findByIdAndUpdate(
        portfolio._id,
        req.body,
        { new: true, runValidators: true }
      );
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
