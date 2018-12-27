import { PipeTransform, Pipe } from '@angular/core';
import { Post } from '../../models/post'



@Pipe({
    name: 'postGroupFilterPipe'
})



export class PostGroupFilterPipe implements PipeTransform {

    transform(posts: Post[], searchTerm: string): Post[]{
        if (!posts || !searchTerm) {
            return posts;

        }
        if (searchTerm == "posts") {
                return posts;
        }
        return posts.filter(post =>
            post.group.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);




    }
}
