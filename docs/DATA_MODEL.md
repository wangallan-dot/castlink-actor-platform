# 初步数据模型

## User

- id
- phone / email
- identity: actor | crew
- verification_status
- created_at
- last_active_at

## ActorProfile

- user_id
- stage_name
- legal_name_private
- gender
- birth_year
- playing_age_min / playing_age_max
- height / weight
- city
- work_regions
- accepts_travel
- can_stay_on_set
- biography
- tagline
- availability_status
- profile_visibility
- profile_completeness

## ActorMedia

- actor_id
- type: headshot | full_body | showreel | intro | monologue | skill
- file_url
- thumbnail_url
- duration
- visibility
- sort_order
- review_status

## Recruitment

- crew_id
- project_name
- project_type
- city
- district
- accepts_non_local_actors
- provides_accommodation
- publish_at
- application_deadline
- shoot_start / shoot_end
- status: draft | reviewing | open | closing | closed | completed

## RecruitmentPosition

- recruitment_id
- title
- gender_requirement
- playing_age_min / playing_age_max
- height_min / height_max
- appearance_tags
- skills
- language_requirements
- shoot_days
- compensation_type
- compensation_min / compensation_max
- remaining_slots

## Application

- recruitment_position_id
- actor_id
- source: actor_apply | crew_invite
- status
- submitted_profile_snapshot
- submitted_media
- availability_confirmation
- created_at

## Audition

- application_id
- instructions
- sides_file
- deadline
- submission_media
- submitted_at
- review_status

## Conversation

- recruitment_id
- recruitment_position_id
- actor_id
- participants
- status

## Privacy design

身份证件、真实姓名、手机号、合同和收款信息不得进入公共搜索索引。演员公开资料、仅受邀资料和私密资料需要分级存储与访问控制。
