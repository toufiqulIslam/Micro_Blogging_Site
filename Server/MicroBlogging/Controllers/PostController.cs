using MicroBlogging.Models;
using System.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MicroBlogging.Controllers
{
    public class PostController : Controller
    {
        #region

        MicroBloggingDBEntities mbdb = new MicroBloggingDBEntities();

        #endregion

        [HttpGet]
        public JsonResult Get(int current_user)
        {
            List<post> post_data = mbdb.posts.ToList();

            List<PostViewModel> post_view_data = GetReactionData(post_data, current_user);

            return Json(post_view_data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetByUser(int user_id)
        {
            List<post> post_data = mbdb.posts.Where(p => p.user_id == user_id).ToList();

            List<PostViewModel> post_view_data = GetReactionData(post_data, user_id);

            return Json(post_view_data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(PostViewModel post_data)
        {
            try
            {
                if (post_data.user_id > 0)
                {
                    mbdb.posts.Add(new post
                    {
                        user_id = post_data.user_id,
                        title = post_data.title,
                        description = post_data.description
                    });

                    mbdb.SaveChanges();

                    List<post> post_data_return = mbdb.posts.Where(p => p.user_id == post_data.user_id).ToList();

                    return Json(post_data_return, JsonRequestBehavior.AllowGet);
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
        public JsonResult Reaction(PostViewModel post_data)
        {
            try
            {
                if (post_data.post_id > 0 && post_data.user_id > 0 && (post_data.liked == "yes" ||
                    post_data.disliked == "yes" || !string.IsNullOrEmpty(post_data.comment)) && post_data.current_user > 0)
                {
                    List<reaction> reaction_data = mbdb.reactions.Where(r => r.post_id == post_data.post_id
                                                                        && r.user_id == post_data.current_user).ToList();

                    if (reaction_data.Count > 0)
                    {
                        if (!string.IsNullOrEmpty(post_data.comment))
                        {
                            reaction_data[0].comment = post_data.comment;
                            post_data.liked = post_data.liked_by_user;
                            post_data.disliked = post_data.disliked_by_user;
                        }
                        else
                        {
                            reaction_data[0].is_liked = post_data.liked;
                            reaction_data[0].is_disliked = post_data.disliked;
                        }
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(post_data.comment))
                        {
                            mbdb.reactions.Add(new reaction
                            {
                                user_id = post_data.current_user,
                                post_id = post_data.post_id,
                                comment = post_data.comment
                            });

                            post_data.liked = post_data.liked_by_user;
                            post_data.disliked = post_data.disliked_by_user;
                        }
                        else
                        {
                            mbdb.reactions.Add(new reaction
                            {
                                user_id = post_data.current_user,
                                post_id = post_data.post_id,
                                is_liked = post_data.liked,
                                is_disliked = post_data.disliked
                            });
                        }
                    }

                    mbdb.SaveChanges();

                    int reaction_like_count = mbdb.reactions.Where(r => r.post_id == post_data.post_id && r.is_liked == "yes").ToList().Count;

                    int reaction_dislike_count = mbdb.reactions.Where(r => r.post_id == post_data.post_id && r.is_disliked == "yes").ToList().Count;

                    List<post> post_details = mbdb.posts.Where(r => r.post_id == post_data.post_id).ToList();

                    post_details[0].like_count = reaction_like_count;
                    post_details[0].dislike_count = reaction_dislike_count;

                    mbdb.SaveChanges();

                    post_details = mbdb.posts.Where(r => r.post_id == post_data.post_id).ToList();

                    List<PostViewModel> post_view_data = GetReactionData(post_details, post_data.current_user);

                    return Json(post_view_data, JsonRequestBehavior.AllowGet);
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


        #region Methods

        [NonAction]
        private List<PostViewModel> GetReactionData(List<post> post_data, int match_user)
        {

            List<reaction> reaction_list = mbdb.reactions.Where(r => !string.IsNullOrEmpty(r.comment)).ToList();

            List<ReactionViewModel> reaction_data = reaction_list.Select(p => new ReactionViewModel
            {
                user_id = p.user_id,
                post_id = p.post_id,
                is_liked = p.is_liked,
                is_disliked = p.is_disliked,
                comment = p.comment,
                username = mbdb.users.Where(u => u.user_id == p.user_id).Select(ur => ur.username).SingleOrDefault().ToString()

            }).ToList();

            reaction_data.Where(r => r.user_id == match_user).ToList().ForEach(r => r.username = "You");

            List<PostViewModel> post_view_data = post_data.Select(p => new PostViewModel
            {
                user_id = p.user_id,
                post_id = p.post_id,
                title = p.title,
                description = p.description,
                like_count = p.like_count,
                dislike_count = p.dislike_count,
                comment_list = reaction_data.Where(r => r.post_id == p.post_id).ToList()

            }).ToList();

            foreach (PostViewModel data in post_view_data)
            {
                if (mbdb.reactions.Where(r => r.user_id == match_user && r.post_id == data.post_id && r.is_liked == "yes").Count() > 0)
                {
                    data.liked_by_user = "yes";
                }
                else if (mbdb.reactions.Where(r => r.user_id == match_user && r.post_id == data.post_id && r.is_disliked == "yes").Count() > 0)
                {
                    data.disliked_by_user = "yes";
                }
            }

            return post_view_data;
        }

        #endregion
    }
}