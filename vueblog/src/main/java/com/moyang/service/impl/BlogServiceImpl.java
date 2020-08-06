package com.moyang.service.impl;

import com.moyang.entity.Blog;
import com.moyang.mapper.BlogMapper;
import com.moyang.service.BlogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author moyang
 * @since 2020-08-04
 */
@Service
public class BlogServiceImpl extends ServiceImpl<BlogMapper, Blog> implements BlogService {

}
