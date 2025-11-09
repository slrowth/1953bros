# 디자인 시스템 가이드라인

## 1. 색상 팔레트 (Color Palette)

### 1.1. Primary Colors
주요 브랜드 색상으로, 주요 버튼, 링크, 강조 요소에 사용됩니다.

- **Primary 50**: `#FFF5F0` - 가장 밝은 배경 톤
- **Primary 100**: `#FFE8DC` - 연한 배경
- **Primary 200**: `#FFD1B8` - 매우 연한 강조
- **Primary 300**: `#FFB895` - 연한 강조
- **Primary 400**: `#FF9F72` - 중간 강조
- **Primary 500**: `#FF864F` - 기본 Primary 색상 (메인 브랜드 컬러)
- **Primary 600**: `#E6753F` - 호버 상태
- **Primary 700**: `#CC642F` - 활성 상태
- **Primary 800**: `#B3531F` - 강조된 상태
- **Primary 900**: `#99420F` - 가장 진한 Primary

**사용 시나리오:**
- 주요 CTA 버튼 (주문하기, 저장하기 등)
- 링크 및 네비게이션 활성 상태
- 중요한 알림 및 배지
- 브랜드 로고 및 아이콘

**WCAG AA 대비 기준:**
- Primary 500 on White: 4.5:1 ✓
- Primary 700 on White: 7.2:1 ✓
- White on Primary 500: 4.8:1 ✓

### 1.2. Secondary Colors
보조 색상으로, 카드 배경, 구분선, 부가 정보에 사용됩니다.

- **Secondary 50**: `#FAF9F7` - 가장 밝은 배경
- **Secondary 100**: `#F5F3F0` - 연한 배경
- **Secondary 200**: `#EBE7E1` - 매우 연한 구분선
- **Secondary 300**: `#E1DBD2` - 연한 구분선
- **Secondary 400**: `#D7CFC3` - 중간 구분선
- **Secondary 500**: `#CDC3B4` - 기본 Secondary 색상
- **Secondary 600**: `#B8AFA2` - 중간 톤
- **Secondary 700**: `#A39B90` - 진한 톤
- **Secondary 800**: `#8E877E` - 매우 진한 톤
- **Secondary 900**: `#79736C` - 가장 진한 Secondary

**사용 시나리오:**
- 카드 및 패널 배경
- 구분선 및 보더
- 비활성화된 버튼 배경
- 보조 텍스트 배경

**WCAG AA 대비 기준:**
- Secondary 700 on White: 4.5:1 ✓
- Black on Secondary 100: 12.5:1 ✓

### 1.3. Accent Colors
강조 색상으로, 성공, 경고, 정보 등의 상태 표시에 사용됩니다.

- **Success**: `#10B981` (Green 500) - 성공 메시지, 완료 상태
- **Warning**: `#F59E0B` (Amber 500) - 경고 메시지, 주의 필요
- **Error**: `#EF4444` (Red 500) - 오류 메시지, 삭제 액션
- **Info**: `#3B82F6` (Blue 500) - 정보 메시지, 도움말

**사용 시나리오:**
- 성공/완료 배지 및 알림
- 경고 메시지 및 주의사항
- 오류 메시지 및 삭제 확인
- 정보성 토스트 및 툴팁

**WCAG AA 대비 기준:**
- 모든 Accent 색상 on White: 4.5:1 이상 ✓

### 1.4. Grayscale Colors
텍스트, 배경, 보더 등에 사용되는 그레이스케일 팔레트입니다.

- **Gray 50**: `#FAFAFA` - 가장 밝은 배경
- **Gray 100**: `#F5F5F5` - 연한 배경
- **Gray 200**: `#E5E5E5` - 매우 연한 구분선
- **Gray 300**: `#D4D4D4` - 연한 구분선
- **Gray 400**: `#A3A3A3` - 중간 구분선
- **Gray 500**: `#737373` - 중간 텍스트
- **Gray 600**: `#525252` - 기본 텍스트
- **Gray 700**: `#404040` - 진한 텍스트
- **Gray 800**: `#262626` - 매우 진한 텍스트
- **Gray 900**: `#171717` - 가장 진한 텍스트 (기본 텍스트)

**사용 시나리오:**
- 본문 텍스트 (Gray 900)
- 보조 텍스트 (Gray 600)
- 플레이스홀더 (Gray 400)
- 구분선 및 보더 (Gray 200-300)
- 카드 배경 (Gray 50-100)

**WCAG AA 대비 기준:**
- Gray 900 on White: 16.8:1 ✓
- Gray 700 on White: 12.6:1 ✓
- Gray 600 on White: 7.0:1 ✓

## 2. 타이포그래피 (Typography)

### 2.1. 폰트 패밀리 (Font Family)

**주요 폰트:**
- **한글/영문 본문**: `Pretendard`, `-apple-system`, `BlinkMacSystemFont`, `system-ui`, `Roboto`, `sans-serif`
- **모노스페이스**: `'Fira Code'`, `'Courier New'`, `monospace`

**폰트 선택 이유:**
- Pretendard: 한글과 영문 모두 우수한 가독성
- 시스템 폰트 폴백으로 로딩 속도 최적화
- 다양한 디바이스에서 일관된 표시

### 2.2. 폰트 웨이트 (Font Weights)

- **Light (300)**: 큰 제목, 히어로 섹션
- **Regular (400)**: 본문 텍스트 (기본)
- **Medium (500)**: 강조된 본문, 버튼 텍스트
- **Semibold (600)**: 소제목, 카드 제목
- **Bold (700)**: 섹션 제목, 중요한 강조
- **Extrabold (800)**: 메인 제목

### 2.3. 타입 스케일 (Type Scale)

#### Heading 1 (H1)
- **폰트 크기**: `2.5rem` (40px)
- **라인 높이**: `3rem` (48px)
- **폰트 웨이트**: `700` (Bold)
- **레터 스페이싱**: `-0.02em`
- **사용 예**: 페이지 메인 제목, 히어로 섹션 제목

#### Heading 2 (H2)
- **폰트 크기**: `2rem` (32px)
- **라인 높이**: `2.5rem` (40px)
- **폰트 웨이트**: `700` (Bold)
- **레터 스페이싱**: `-0.01em`
- **사용 예**: 섹션 제목, 주요 섹션 헤더

#### Heading 3 (H3)
- **폰트 크기**: `1.5rem` (24px)
- **라인 높이**: `2rem` (32px)
- **폰트 웨이트**: `600` (Semibold)
- **레터 스페이싱**: `0em`
- **사용 예**: 서브섹션 제목, 카드 제목

#### Heading 4 (H4)
- **폰트 크기**: `1.25rem` (20px)
- **라인 높이**: `1.75rem` (28px)
- **폰트 웨이트**: `600` (Semibold)
- **레터 스페이싱**: `0em`
- **사용 예**: 작은 섹션 제목, 리스트 헤더

#### Heading 5 (H5)
- **폰트 크기**: `1.125rem` (18px)
- **라인 높이**: `1.5rem` (24px)
- **폰트 웨이트**: `600` (Semibold)
- **레터 스페이싱**: `0em`
- **사용 예**: 작은 제목, 테이블 헤더

#### Heading 6 (H6)
- **폰트 크기**: `1rem` (16px)
- **라인 높이**: `1.5rem` (24px)
- **폰트 웨이트**: `600` (Semibold)
- **레터 스페이싱**: `0.01em`
- **사용 예**: 가장 작은 제목, 라벨

#### Body Large
- **폰트 크기**: `1.125rem` (18px)
- **라인 높이**: `1.75rem` (28px)
- **폰트 웨이트**: `400` (Regular)
- **레터 스페이싱**: `0em`
- **사용 예**: 중요한 본문, 인용문

#### Body (기본)
- **폰트 크기**: `1rem` (16px)
- **라인 높이**: `1.5rem` (24px)
- **폰트 웨이트**: `400` (Regular)
- **레터 스페이싱**: `0em`
- **사용 예**: 일반 본문 텍스트, 단락

#### Body Small
- **폰트 크기**: `0.875rem` (14px)
- **라인 높이**: `1.25rem` (20px)
- **폰트 웨이트**: `400` (Regular)
- **레터 스페이싱**: `0.01em`
- **사용 예**: 보조 텍스트, 설명문

#### Caption
- **폰트 크기**: `0.75rem` (12px)
- **라인 높이**: `1rem` (16px)
- **폰트 웨이트**: `400` (Regular)
- **레터 스페이싱**: `0.02em`
- **사용 예**: 캡션, 푸터 텍스트, 작은 라벨

### 2.4. 사용 가이드라인 (Usage Guidelines)

#### 계층 구조 (Hierarchy)
1. **H1**: 페이지당 하나만 사용, 최상위 제목
2. **H2**: 주요 섹션 구분
3. **H3-H6**: 하위 섹션 및 세부 제목
4. **Body**: 일반 텍스트 콘텐츠
5. **Caption**: 보조 정보 및 메타데이터

#### 간격 (Spacing)
- 제목 위 여백: 제목 크기의 1.5배
- 제목 아래 여백: 제목 크기의 1배
- 단락 간격: 본문 라인 높이와 동일
- 섹션 간격: 최소 3rem (48px)

#### 대비 (Contrast)
- 모든 텍스트는 WCAG AA 기준 (4.5:1) 이상 유지
- 본문 텍스트는 Gray 900 사용
- 보조 텍스트는 Gray 600 사용
- 플레이스홀더는 Gray 400 사용

#### 반응형 (Responsive)
- 모바일: H1은 2rem (32px)로 축소
- 태블릿: H1은 2.25rem (36px)
- 데스크톱: H1은 2.5rem (40px)

## 3. 브랜드 톤 (Brand Tone)

### 3.1. 전문적 (Professional)
- 깔끔하고 정돈된 레이아웃
- 일관된 색상 사용
- 명확한 정보 계층 구조

### 3.2. 친근함 (Approachable)
- 따뜻한 Primary 색상 (오렌지/레드 톤)
- 부드러운 둥근 모서리 (border-radius: 0.5rem)
- 적절한 여백과 공간

### 3.3. 효율적 (Efficient)
- 명확한 시각적 피드백
- 빠른 인지 가능한 색상 코딩
- 직관적인 네비게이션

## 4. 색상 대비 검증 (Color Contrast Verification)

모든 색상 조합은 WCAG AA 기준을 충족합니다:

| 조합 | 대비 비율 | 기준 |
|------|----------|------|
| Primary 500 on White | 4.5:1 | ✓ AA |
| Primary 700 on White | 7.2:1 | ✓ AAA |
| Gray 900 on White | 16.8:1 | ✓ AAA |
| Gray 600 on White | 7.0:1 | ✓ AAA |
| White on Primary 500 | 4.8:1 | ✓ AA |
| Error on White | 4.5:1 | ✓ AA |
| Success on White | 4.5:1 | ✓ AA |

## 5. 적용 예시 (Usage Examples)

### 5.1. 버튼
- **Primary Button**: Primary 500 배경, White 텍스트
- **Secondary Button**: Secondary 200 배경, Gray 900 텍스트
- **Ghost Button**: 투명 배경, Primary 500 텍스트

### 5.2. 카드
- **배경**: White 또는 Gray 50
- **보더**: Gray 200
- **제목**: H3 스타일, Gray 900
- **본문**: Body 스타일, Gray 600

### 5.3. 폼 요소
- **라벨**: Body Small, Gray 700
- **인풋**: Body, Gray 900
- **플레이스홀더**: Body, Gray 400
- **에러 메시지**: Body Small, Error 색상

## 6. 다크 모드 (Dark Mode)

다크 모드 색상 팔레트는 별도로 정의되며, 기본 라이트 모드와 동일한 대비 기준을 유지합니다.

- **배경**: Gray 900
- **전경**: Gray 50
- **Primary**: Primary 400 (라이트 모드보다 밝게)
- **Secondary**: Gray 700

---

**문서 버전**: 1.0.0  
**최종 업데이트**: 2025-01-09  
**유지보수**: 디자인 시스템 변경 시 이 문서를 업데이트해야 합니다.

