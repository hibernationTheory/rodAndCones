from django.db import models

# Create your models here.

class Topic(models.Model):
	"""
	name
	short_name
	tags
	color
	image_name
	summary
	categories
	description
	competency
	reasoning
	rating
	status
	priority
	dependencies
	related
	tags
	resources : to-do, done, backlog
	"""
	name=models.CharField(max_length=64, unique=True)
	short_name=models.CharField(max_length=64, unique=False)
	tags=models.TextField(null=True)
	color=models.CharField(max_length=12, unique=False)
	image_name=models.CharField(max_length=96, unique=False)
	summary=models.TextField(null=True)
	categories=models.TextField(null=True)
	description=models.TextField(null=True)
	competency=models.IntegerField()
	reason=models.TextField(null=True)
	rating=models.IntegerField()
	status=models.TextField(null=True)
	priority=models.IntegerField()
	dependencies=models.TextField(null=True)
	related=models.TextField(null=True)
	resources=models.TextField(null=True)
	links=models.TextField(null=True)


	def __unicode__(self):
		return self.name

