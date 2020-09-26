module.exports = {
  siteMetadata: {
    title: `Coronga Tracker`,
    description: `Descrição do coronga tracker.`,
    author: `@codeforcuritiba`,
    twitterHandle: '@codeforcuritiba',
		url: 'https://corongatracker.org',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Coronga Tracker`,
        short_name: `Coronga Tracker`,
        start_url: `/`,
        background_color: `#F05600`,
        theme_color: `#F05600`,
        display: `minimal-ui`,
        icon: `src/images/coronga-tracker-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/ 
        }
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'getGeoLocation.js', // Change to the script filename
        async: true,
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'handleDB.js', // Change to the script filename
        async: true,
      },
    },
    {
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'handleBehaviors.js', // Change to the script filename
      },
    },
  ],
}
