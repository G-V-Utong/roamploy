import { PostgrestError } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { ResumeData } from './types'

type DatabaseError = PostgrestError | Error

export async function saveResume(resumeData: ResumeData): Promise<{ error: DatabaseError | null }> {
  try {
    const { data: existingResume, error: fetchError } = await supabase
      .from('resumes')
      .select('id')
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
      throw fetchError
    }

    if (existingResume) {
      // Update existing resume
      const { error } = await supabase
        .from('resumes')
        .update({ data: resumeData })
        .eq('id', existingResume.id)

      return { error }
    } else {
      // Create new resume
      const { error } = await supabase
        .from('resumes')
        .insert([{ data: resumeData }])

      return { error }
    }
  } catch (error) {
    return { error: error as DatabaseError }
  }
}

export async function getResume(): Promise<{ data: ResumeData | null; error: DatabaseError | null }> {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('data')
      .single()

    return {
      data: data?.data as ResumeData || null,
      error
    }
  } catch (error) {
    return { data: null, error: error as DatabaseError }
  }
}
