using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MicroBlogging.Models;

namespace MicroBlogging.Controllers
{
    public class UserController : Controller
    {
        #region

        MicroBloggingDBEntities mbdb = new MicroBloggingDBEntities();

        #endregion
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Create(UserViewModel user_data)
        {
            try
            {
                List<user> existing_user_info = mbdb.users.Where(u => u.email == user_data.email && u.username == user_data.username).ToList();

                if (!string.IsNullOrEmpty(user_data.username) && !string.IsNullOrEmpty(user_data.email) &&
                    !string.IsNullOrEmpty(user_data.password) && existing_user_info.Count == 0)
                {
                    mbdb.users.Add(new user
                    {
                        username = user_data.username,
                        email = user_data.email,
                        password = user_data.password
                    });

                    mbdb.SaveChanges();

                    List<user> user_details = mbdb.users.Where(u => u.email == user_data.email && u.password == user_data.password).ToList();

                    return Json(user_details, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception er)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Login(UserViewModel user_data)
        {
            List<user> user_info = mbdb.users.Where(u => u.email == user_data.email && u.password == user_data.password).ToList();

            return Json(user_info, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update(UserViewModel user_data)
        {
            try
            {
                List<user> existing_user_info = mbdb.users.Where(u => u.email == user_data.email || u.username == user_data.username).ToList();
                List<user> user_info = mbdb.users.Where(u => u.email == user_data.email).ToList();

                if (!string.IsNullOrEmpty(user_data.username) && !string.IsNullOrEmpty(user_data.password) 
                                    && existing_user_info.Count-1 == 0 && user_info.Count > 0)
                {
                    existing_user_info[0].username = user_data.username;
                    existing_user_info[0].password = user_data.password;

                    mbdb.SaveChanges();

                    List<user> user_details = mbdb.users.Where(u => u.email == user_data.email && u.password == user_data.password).ToList();

                    return Json(user_details, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception er)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }
    }
}