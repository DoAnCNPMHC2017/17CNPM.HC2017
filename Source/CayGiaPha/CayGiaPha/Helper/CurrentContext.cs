using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace CayGiaPha.Helper
{
    public class CurrentContext
    {
        public static bool IsLogged()
        {
            var flag = HttpContext.Current.Session["isLogin"];
            if (flag == null || (int)flag == 0)
            {
                if (HttpContext.Current.Request.Cookies["userID"] != null)
                {
                    string userIdCookie = Convert.ToString(HttpContext.Current.Request.Cookies["userID"].Value);
                    using (var ctx = new CGPEntities())
                    {
                        var user = ctx.Accounts.Where(u => u.Username == userIdCookie).FirstOrDefault();

                        HttpContext.Current.Session["isLogin"] = 1;
                        HttpContext.Current.Session["user"] = user;

                    }
                    return true;
                }
                return false;
            }
            return true;
        }

        public static Account GetCurUser()
        {
            string id = ((Account)HttpContext.Current.Session["user"]).Username;
            using (var ctx = new CGPEntities())
            {
                var user = ctx.Accounts.Where(u => u.Username == id).FirstOrDefault();
                HttpContext.Current.Session["user"] = null;
                if (user != null)
                {
                    HttpContext.Current.Session["user"] = user;
                }
            }
            return (Account)HttpContext.Current.Session["user"];
        }
        public static void SetCurrentTree(int id)
        {
            HttpContext.Current.Session["tree"] = id;
        }
        public static int GetCurrentTree()
        {
            return (int)HttpContext.Current.Session["tree"];
        }
        public static void Destroy()
        {
            HttpContext.Current.Session["isLogin"] = 0;
            HttpContext.Current.Session["user"] = null;
            HttpContext.Current.Session["tree"] = null;
            //HttpContext.Current.Response.Cookies["userID"].Expires = DateTime.Now.AddDays(-1);
        }
    }
}