# 初步数据模型

## User

- id
- phone / email
- role: actor | producer | agent | admin
- verification_status
- created_at
- last_active_at

## ActorProfile

- user_id
- stage_name
- legal_name_private
- english_name
- gender
- birth_year
- playing_age_min / playing_age_max
- height / weight
- city
- work_regions
- biography
- tagline
- availability_status
- agency_status
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

## ActorSkill

- actor_id
- skill_id
- level
- verified
- evidence_media_id

## Credit

- actor_id
- project_title
- project_type
- role_name
- role_level
- director
- company
- release_year
- evidence_url

## Project

- owner_organization_id
- title
- project_type
- public_name / confidential_name
- status
- city
- shoot_start / shoot_end
- confidentiality_level
- verification_status

## CastingRole

- project_id
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
- application_deadline
- status

## Application

- role_id
- actor_id
- source: actor_apply | producer_invite | agent_submit
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

## CandidateReview

- application_id
- reviewer_id
- appearance_score
- performance_score
- voice_score
- role_fit_score
- comment
- visibility: private | team

## Conversation

- project_id
- role_id
- actor_id
- participants
- status

## Privacy design

演员敏感字段应与公开资料分表或分层存储。身份证件、真实姓名、手机号、合同和收款信息不得进入公共搜索索引。
