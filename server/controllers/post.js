const {create, select, deleteReq } = require('../methods/guestbook');

module.exports = {
  create: async (req, res) => {
      const {
          body: {postText, userId}
      } = req;

      try{
          const guestBook = await create(postText, userId);

          if(guestBook.error) {
              res.status(500).json({
                 error: guestBook.error
              });
              return;
          }

          res.status(200).json({
              data: guestBook
          })
      } catch (error) {
          res.status(500).json({
              error
          })
      }
  },
  select: async (req, res) => {
      try{
          const allBooks = await select();
          if(allBooks.error) {
              res.status(200).json({
                      message: "No guest books contains"
              });
              return;
          }
          res.status(200).json({
              data: allBooks
          })
      } catch (error) {
          res.status(500).json({
              error
          })
      }
  },
    page: async (req, res) => {
      let {
          params: {pageNumber},
          query: {personal, userId}
      } = req;

      !pageNumber ? pageNumber = 0 : false;
      !personal ? personal = false : false;
      !userId ? userId = false : false;

      let records = await select(personal, userId);

      records = records.slice((pageNumber * 5), 5 + (pageNumber * 5));
      res.status(200).json({
          data: records
      })
    },
    count: async (req, res) => {
        let {
            query: {personal, userId}
        } = req;

        !personal ? personal = false : false;
        !userId ? userId = false : false;

      try{
          const records = await select(personal, userId);

          if(records.error) {
            res.status(500).json({
                error: records.error
            });
            return;
          }

          const length = records.length;
          const pages = Math.ceil(length/5);

          res.status(200).json({
              data: {
                  length,
                  pages
              }
          })
      } catch (error) {
          res.status(500).json({
              error
          })
      }
    },
    delete: async (req, res) => {
      const {
          query: { id }
      } = req;

      try{
          const success = await deleteReq(id);
          if( success === true ) {
              res.status(200).json({
                  data: {
                      success
                  }
              })
          } else {
              res.status(500).json({
                  error: success
              })
          }
      } catch (error) {
          res.status(500).json({
              error
          })
      }
    }
};