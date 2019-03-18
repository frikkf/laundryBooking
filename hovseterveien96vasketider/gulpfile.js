var gulp = require('gulp');
const gcPub = require('gulp-gcloud-publish');

gulp.task('publish', function() {
  return gulp.src('build/**/*')
    .pipe(gcPub({
      bucket: 'admin.norahelmer.no',
      keyFilename: './privatekey.json',
      projectId: 'hovseterveien96vasketider',
      public: true,
      transformDestination: function(path) {
        return path.toLowerCase();
      },
      metadata: {
          cacheControl: 'max-age=0, no-transform, public',
      }
    }));
});
